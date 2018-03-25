---
layout: post
title: "expect-redux: A simple testing library for redux apps"
---
It's been two years since I published my first npm package [expect-redux](https://github.com/rradczewski/expect-redux/), a testing library for redux. With the latest release, I figured it's time to present what it does and why I continue to use it in my projects.

`expect-redux` solves a simple problem I kept having when I started out developing JS apps with React and Redux: Getting a proper **Given-When-Then** test setup working for feature and interaction tests.

Just coming from working on an eventsourced back-end application, react and redux immediately felt familiar, just within a slightly different context. **Aggregate state** (*given*) becomes the **mounted React app**, a **command** (*when*) is given by **user input** and the results are not **events**, but new **actions** (*then*) dispatched to the store.

```jsx
it('will increase the counter', () => {
  // Given
  const store = configureStore({}, [storeSpy]);
  const component = mount(<App store={store} />);

  // When
  component.find('#increase-locally').simulate('click');

  // Then
  return expectRedux(store)
    .toDispatchAnAction()
    .matching({ type: 'INCREASE_COUNTER_LOCALLY' });
});
```

## From layer testing

<TODO>Unit Testing between reducers and dumb components</TODO>

## To interaction testing

<TODO>Large feature-driven tests, close to real browser tests but still very fast</TODO>
<TODO>Specific unit tests for complex reducers, large acceptance tests for features</TODO>
