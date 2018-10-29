---
layout: post
title: "expect-redux: Better interaction tests with redux"
image: "assets/expect-redux-header.jpg"
image_alt: "The logo of expect-redux"
image-listing: "assets/expect-redux.jpg"
---
[`expect-redux`](https://github.com/rradczewski/expect-redux/) solves a simple problem I kept having when I started out developing JS apps with React and Redux: Getting a proper **Given-When-Then** test setup working for feature and interaction tests, no matter which side-effect library the project is using. Here's why I think it's useful for everyone working with redux.

It has already been two years since I published the first version of `expect-redux`, back when I was working at vaamo. With the latest release, I figured it's time to really show off what it does and why I continue to use it in my projects.

## Redux in the wild

The one thing I immediately loved about the whole React/Redux ecosystem is how easily testable it is. With `jsdom` and `enzyme`, my tests never felt closer to running in a browser than ever, without actually running `phantomjs`. Even large acceptance tests will run in a few hundred milliseconds, everywhere, from CI to a docker container to my local machine, with no more setup than running `npm install`.

`redux` in particular is an amazing library because of its minimal API surface area and the profound impact it has on how you design a frontend application. All business logic suddenly becomes easily testable in isolation and it's trivially easy to construct a specific application state for a test.

But in practice, redux rarely comes alone. Throughout my time working with redux, I've seen a similar pattern emerge in the projects I'm working in: We start the project with some simple synchronous side-effects and a few `fetch`-calls that are easily taken care of using [`redux-thunk`](https://github.com/reduxjs/redux-thunk), but sooner or later the project grows beyond the simple use-cases where redux-thunk shines in.

*Here's how a minimal test of a thunk can look like:*
```js
import { fetchData } from './effects';

it('should dispatch the data to the store', async () => {
  const dispatch = jest.fn();
  const dataService = jest.fn().mockResolvedValue([1, 2, 3]);

  // Thunk syntax: (dispatch, getState, extraArguments) => ?
  await fetchData(dispatch, undefined, { dataService });

  expect(dispatch).toHaveBeenCalledWith({
    type: 'DATA_RETRIEVED', payload: [1, 2, 3]
  });
});
```

At this point, the team will look right and left of `redux-thunk` and eventually settle for [`redux-saga`](https://redux-saga.js.org/) or [`redux-observable`](https://redux-observable.js.org/).
Both libraries, although they are based on completely different paradigms, allow you to model these complex business processes and side-effects while taking care of error handling and asynchronicity just fine.

## Testing pains

<TODO>
- Testing with side-effects isn't easy because of timing issues, asynchronicity
- Being able to test them properly is necessary as they are the heart of your application
- The faster and concise your tests are, the Better
- They're tightly coupled to redux and to the library's paradigm (yield vs observables) but you can't easily put a test-harness around them
- Integrating tests need to keep asynchronicity in mind, mess with setTimeout and waits and all
</TODO>

## Patterns to cope with it

<TODO>
You have several ways of testing them anyways:
- Whitebox testing them (see redux-observable diagrams and redux-saga)
  - Libraries like [`redux-saga-test-plan`](https://github.com/jfairbank/redux-saga-test-plan) can help with that, but you still very much test redux-saga lingo and not outcomes in redux.
- Splitting up tests between large integration tests (E2E & ext. stubs) and small confined unit-tests, but not testing the seams and layers in between
- Add timeouts & waits that wait for specific conditions - turns testing brittle and slow
</TODO>

## ENTERUNT expect-redux

<TODO>
expect-redux works with the latter pattern but makes it fast and improves test-readability and conciseness (haha)

Tests behaviour from current-state to triggering an action and observing it's effects.

It doesn't assert the eventual state (outcome), as it is derivative of the actual transition anyway and would couple the next state to your test of the current state and its transitions.

It only requires you to isolate actual side-effects so you can mock them during tests (`fetch` calls et al)

with jsdom being that fast, you can run tests similar to E2E tests but fast and without external dependencies like a browser.

You don't need brittle waits between commands in your tests as expect-redux will take care of that. You can define assertions that if failed will give you proper error messages that show the current state of your app and how it should've been. Understand why your app is not doing what you want.
</TODO>

## The bigger picture

<TODO>
expect-redux brings asynchronicity-agnostic testing to redux while making tests easier to read and maintain and the code easier to refactor (as you don't depend on resulting state but on actions).
</TODO>
