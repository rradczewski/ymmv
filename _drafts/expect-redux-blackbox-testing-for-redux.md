---
layout: post
title: "expect-redux: A simple testing library for redux apps"
excerpt: "expect-redux solves a simple problem I kept having when I started out developing JS apps with React and Redux: Getting a proper Given-When-Then test setup working for feature and interaction tests."
image: "assets/expect-redux-header.jpg"
image_alt: "The logo of expect-redux"
image-listing: "assets/expect-redux.jpg"
---
_It's been two years since I published my first npm package [expect-redux](https://github.com/rradczewski/expect-redux/), a testing library for redux. With the latest release, I figured it's time to present what it does and why I continue to use it in my projects._

`expect-redux` solves a simple problem I kept having when I started out developing JS apps with React and Redux: Getting a proper **Given-When-Then** test setup working for feature and interaction tests.

Back then, I was just coming from working on an eventsourced back-end application, and react and redux immediately felt familiar to me - just within a slightly different context and with different names: **Aggregate state** (*given*) becomes the **mounted app** (with the redux store of course), a **command** (*when*) is given by **user input** and the results are not **events**, but new **actions** (*then*) dispatched to the store.

The definition above already gives you a hint about the testing subjects I see in a typical webapp: The redux store isn't a persisted data storage, but the state provider to the UI. It's perfectly reasonable to model the store after the use cases you're looking to implement and thus the way you structure the UI and your react code.

As both will be tightly coupled anyways, testing them in isolation usually only works for complex visual components or very complex application states, but will feel overzealous for lots of features.

## Layer testing only takes you so far

In my experience, testing the individual layers in a react-redux app will give me a wrong sense of safety, as you're quick to omit the code that is not in your react component, nor in your reducer: all your business logic.

![The different layers one would find in a typcial react-redux app from left to right: visual components, smart components, glue code with react-redux, effects and store middleware like saga or rxobservable and finally the store reducer. effects and store middlewares are greyed out to illustrate how easily they're omitted as testing objective]({% link assets/expectredux_layers_wo_glue.png %})

Testing that business logic sometimes isn't easy though:  
Take for example `redux-saga`, a very popular middleware for redux that helps with modeling processes in redux: Their [docs on testing](https://redux-saga.js.org/docs/advanced/Testing.html) advise you to white-box-test your saga, basically re-implementing and re-asserting every step the saga does in your test (in the correct order).

## Focus on testing features instead

We've come a long way when it comes to testing web apps. Gone are the days of firing up a headless browser and running selenium for your interaction tests and karma for your unit tests. Not to say they're completely useless, but if my tests using `enzyme` and `jsdom` pass I'm already fairly confident that my code is working correctly, so confident that I only test for visual discrepancies between browsers.

With the testing tools available to us, I can write hundreds of tests that fully mount an app with all its layers untouched and test a single aspect of its functionality and still stay under a minute for a full test run - and this is exactly where `expect-redux` comes in.

```jsx
import React from 'react';
import { expectRedux, storeSpy } from 'expect-redux';
import App from './App';
import configureStore from './configureStore';

it('will increase the counter when the button is pressed', () => {
  // Given
  const store = configureStore({}, [storeSpy]);
  const component = mount(<App store={store} />);

  // When
  component.find('#increase-locally').simulate('click');

  // Then
  return expectRedux(store)
    .toDispatchAnAction()
    .ofType('INCREASE_COUNTER_LOCALLY');
});
```

Instead of mocking away the store and testing the business logic in isolation, `expect-redux` allows you to write very descriptive tests that assert a single (user-) interaction with your application and the effect it is supposed to have with regards to the application state.  
It allows you to test that _clicking a button will increase a counter_, all while treating everything between the button's `onClick` handler and the action as a black box, an unnecessary implementation detail.
