---
layout: post
title: "expect-redux: better interaction tests with redux"
image: "assets/expect-redux-header.jpg"
image_alt: "The logo of expect-redux"
image-listing: "assets/expect-redux.jpg"
hide_reading_time: true
---
[`expect-redux`](https://github.com/rradczewski/expect-redux/) solves a big problem I kept running into when I started developing JavaScript apps with React and Redux: Getting a proper and readable **Given-When-Then** test structure working for feature and interaction tests, no matter which side-effect library the project is using. In this post I want to show you a couple of different approaches towards testing redux apps and explain why I think `expect-redux` is useful for everyone working with react and redux.

## Redux in the wild

What I immediately loved about the whole React/Redux ecosystem is how easily testable it is. With `jsdom` and `enzyme`, my tests never felt closer to running in a browser than ever, without actually running in something like `phantomjs`. Even large acceptance tests will run in a few hundred milliseconds, everywhere, from CI to a docker container to my local machine, with no more setup than running `npm install`.

`redux` in particular is an amazing library because of its minimal API surface area and the profound impact it has on how you design a frontend application. All domain state and its transitions suddenly become easily testable in isolation. It's also trivially easy to construct a specific application state for a test by dispatching the right actions, something that was immediately familiar to me when I started using `redux` for the UI of a backend that was built with  [EventSourcing](https://martinfowler.com/eaaDev/EventSourcing.html).

But in practice, `redux` rarely comes alone. Throughout my time working with `redux`, I've seen a pattern emerge in the projects I'm working in: We start the project with some simple synchronous side-effects and a few `fetch`-calls that are easily taken care of using [`redux-thunk`](https://github.com/reduxjs/redux-thunk), but sooner or later the project grows beyond the simple use-cases where `redux-thunk` shines in.

<small>Here's how a minimal test of a thunk can look like:</small>
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

Beyond this point, the team will look right and left of `redux-thunk` and eventually settle for [`redux-saga`](https://redux-saga.js.org/) or [`redux-observable`](https://redux-observable.js.org/).
Both libraries, although they are based on completely different paradigms, allow you to model these complex business processes and side-effects while taking care of error handling and asynchronicity just fine.

## Testing pains

The thing with both libraries is, that while they are very expressive in their own lingo, you have to leave the simplicity of `redux` and `redux-thunk` behind. You eventually find yourself building generator-functions (`redux-saga`) or composing functions that transform emitted actions (`redux-observable`). These sagas or epics are fed into a `runSaga` or `runEpic` function when you construct the store and then run after the reducers in `redux` did their thing. The connection between dispatching an action and starting a process because of that gets lost in the framework.

While `redux-thunk` allows you to wait for a `Promise` to resolve, as the return value of your effect is passed back through the `dispatch` call, both `redux-saga`[^1] and `redux-observable`[^2] will not pass the result of a process back to your `dispatch` call. This isn't necessarily bad, but it again forces you to rethink how you build your application around asynchronously running processes. A very common example of this is navigating to another page after a process is finished - you'll find yourself connecting `redux` with the browser router to solve that one, either by passing `history` around or with [`redux-saga-router`](https://github.com/jfairbank/redux-saga-router) or [`connected-react-router`](https://github.com/supasate/connected-react-router).

I eventually found myself in the ironic situation that while my business processes grew in complexity that I absolutely wanted to put under test, the mechanism I chose to cope with just that complexity made it harder to test the business logic properly as the processes now run outside of my (programmatic) control.

## Patterns to cope with it

Soon, my feature-tests were riddled with `setTimeout` calls to make sure that the event queue was flushed before I ran my assertions, something that obviously is a rather brittle workaround that will sooner or later either cause wrong-negatives or just slow down your test runs in general.

If I still wanted to test the processes themselves, I had to whitebox-test them. Both `redux-saga` and `redux-observable` give you tools to do that, but I have my reservations about them. Let's take a look at both of them:

### redux-saga

The chapter on [Testing](https://redux-saga.js.org/docs/advanced/Testing.html) in redux-saga explains that testing a saga can either be done by manually advancing the generator-function, or by waiting for a saga to finish and then spying on the mocked services, e.g. `dispatch` or `fetch`.

<small>Example taken from [Testing](https://redux-saga.js.org/docs/advanced/Testing.html):</small>
```js
import { put, take } from 'redux-saga/effects';

test('doStuffThenChangeColor', assert => {
  const gen = doStuffThenChangeColor();
  gen.next(); // DO_STUFF
  gen.next(); // DO_STUFF
  gen.next(); // CHOOSE_NUMBER

  assert.test('user choose an even number', a => {
    // cloning the generator before sending data
    const clone = gen.clone();
    a.deepEqual(
      clone.next(chooseNumber(2)).value,
      put(changeUI('red')),
      'should change the color to red'
    );

    a.equal(
      clone.next().done,
      true,
      'it should be done'
    );

    a.end();
  });
});
```

My issue with manually advancing the generator-function is that you need to make sure to carefully call `gen.next()` until you reach something you want to run your assertion on (e.g. the call to `put` above). Add or remove a `yield` step in between that technically doesn't change the behavior your test asserts and you still have to add or remove a call to `gen.next()` so your test stays green. It effectively forces you to follow the exact implementation in your test and thus adds a lot of noise and coupling to the implementation to a test.

Luckily `redux-saga` will let you run your saga with a test-specific store and dependencies through [`runSaga`](https://redux-saga.js.org/docs/api/), but this takes you right back to the start, as you need to assert on the actions dispatched to the store now (exactly what `expect-redux` allows you to do), but you still have to know when to assert. We're effectively back at either establishing synchronicity or using `setTimeout`.

With [`redux-saga-test-plan`](https://github.com/jfairbank/redux-saga-test-plan), there's a testing library that, while closely tied to testing a saga, is very similar to `expect-redux`: It will run the saga and only assert on specific behavior (e.g. `put` calls), but does not require you to know anything about how the saga is implemented.

<a name="redux-saga-test-plan-example" class="hidden">Redux-Testplan-Example</a><small>An example test taken from [the README of `redux-saga-test-plan`](https://github.com/jfairbank/redux-saga-test-plan#simple-example):</small>
```js
it('just works!', () => {
  const api = {
    fetchUser: id => ({ id, name: 'Tucker' }),
  };

  return expectSaga(userSaga, api)
    // Assert that the `put` will eventually happen.
    .put({
      type: 'RECEIVE_USER',
      payload: { id: 42, name: 'Tucker' },
    })

    // Dispatch any actions that the saga will `take`.
    .dispatch({ type: 'REQUEST_USER', payload: 42 })

    // Start the test. Returns a Promise.
    .run();
});
```

### redux-observable

With `redux-observable`, we completely move away from features provided by JavaScript, such as lambdas and generators, and instead move into the realms of reactive programming. The chapter on [Testing redux-observable](https://redux-observable.js.org/docs/recipes/WritingTests.html) introduces us to *marble diagrams*, a testing method that visualizes the exact timing in reactive systems and allows us to exactly assert what should happen and when.

Just like with `redux-saga` and manually advancing a generator, this will eventually lead to projecting the exact order of things that happen in our epic onto the test - with all the negative implications I already mentioned above.

But luckily, there's a way to manually test `rxjs`: You can simply feed an action into the epic, transform the observable to a `Promise`, wait for it to resolve and then assert on the result. Just like with `runSaga`, this will only work for processes that have a defined eventual outcome that you assert against, but at least our tests resolve quickly and we can test the epic itself.

<small>An example test I paired on with [Chris Neuroth](https://twitter.com/c089)</small>
```js
const { of } = rxjs;
const { toArray, filter, mapTo } = require('rxjs/operators');

const pingEpic = action$ => action$.pipe(
    filter(action => action.type === 'PING'),
    mapTo({ type: 'PONG' })
);

const expectObservable = observable$ => {
    return observable$.pipe(toArray()).toPromise();
}

it('should map from PING to PONG', () => {
    const action$ = of({type: 'PING'});

    const epic$ = pingEpic(action$);

    return expectObservable(epic$).then(value => {
        expect(value).toEqual([{type: 'PONG'}]);
    });
});
```

### The result of whitebox-testing

In any case, you'll end up with testing a lot of your crucial business logic in artificially constructed ways and without them being integrated with other middlewares and React without resorting to `setTimeout`. With that, I've seen the tests become less expressive and more brittle; I've felt that I spend a lot of time on false-negatives or bughunting on a single test - something that I definitely consider a big testing smell.

## Improving interaction tests with `expect-redux`

With both `redux-saga` and `redux-observable` being hard to unit-test, I looked at ways to improve those tests that asserted the behavior of a process in the broader context of the application, the interaction tests. When I say *interaction*, I specifically don't talk about integrating with external APIs, but with the other parts of the frontend application. `expect-redux` helps with those dreaded tests where I had to use `setTimeout` and mocked stores to assert on the actions that were eventually dispatched.

<small>A simple test that uses `expect-redux` to assert that something is dispatched (from the [README](https://github.com/rradczewski/expect-redux))</small>
```js
it("should dispatch SUCCESSFULLY_CALLED on success", () => {
  const store = createStore(...);

  fetch('/some-call-to-an-api')
    .then(() => store.dispatch({ type: "SUCCESSFULLY_CALLED" }))

  return expectRedux(store)
    .toDispatchAnAction()
    .ofType("SUCCESSFULLY_CALLED")
});
```

`expect-redux` assumes asynchronicity by default, so every assertion returns a Promise that only resolves when the assertion is met. Otherwise, the test will eventually timeout and you'll be presented with a [proper error message](https://github.com/rradczewski/expect-redux#expectreduxconfigure-bettererrormessagestimeout-number--false-):

```
Error: Expected action of type 'SUCCESSFULLY_CALLED' to be dispatched to store,
       but did not happen in 100ms.

The following actions got dispatched to the store instead (2):

                        TYPE      PROPS
     @@redux/INITs.t.u.n.d.q      {}
         ERROR_WHILE_CALLING      {"error":{ ... }}
```

While it's tempting to assert on the resulting state instead of the actions that are dispatched, I see the actions as the definitive effect of a process and less what the state will result in (which is derived from just those actions anyway). Asserting on the actions will decouple the behavior I'm implementing from the implementation of the state that would follow - we're testing the transition given a prior state, not the resulting state.

And it's still quite fast: The exhaustive test suite of `expect-redux` with 70 individual testcases takes less than 2 seconds on my machine to run, even though it creates redux stores for each test, uses `setTimeout` to "assert" that something won't happen and tests how errors are rendered.

`expect-redux` ultimately allows me to write tests that are integrated into `react`, `redux` or whatever middleware or process manager I'm using, and at the same time it allows me to very expressively assert that a specific feature is working.

Let's rewrite the example using `redux-saga-test-plan` I showed earlier so it works with `expect-redux`:

<small>The example from [above](#redux-saga-test-plan-example) rewritten with `expect-redux`</small>
```js
import { createStore } from 'redux';
import { runSaga } from 'redux-saga';
import { expectRedux, storeSpy } from 'expect-redux';
import { userSaga } from './api';

it('just works!', () => {
  const store = createStore(() => ({}), storeSpy);
  const api = {
    fetchUser: id => ({ id, name: 'Tucker' }),
  };

  runSaga(store, userSaga, api);
  store.dispatch({ type: 'REQUEST_USER', payload: 42 });

  return expectRedux(store)
    .toDispatchAnAction()
    .matching({
      type: 'RECEIVE_USER',
      payload: { id: 42, name: 'Tucker' },
    });
});
```

While it looks a bit more verbose than with `redux-saga-test-plan`, it preserves the *Given-When-Then* structure and allows you to use a store like you would use in your application code with its native API like `dispatch` and `getState`.

From here, I can even go further and mount the complete app including a fully configured store and run a feature test on that:

<small>A sample test that mounts the whole `App`, clicks a button and asserts that a certain method is dispatched (from the [`redux-thunk-example`](https://github.com/rradczewski/expect-redux/blob/master/examples/redux-thunk-example/src/App.t-effect.test.js#L8-L21)):</small>

```js
it('will increase the counter', () => {
  const services = {
    counterService: () =>
      new Promise(resolve => setTimeout(() => resolve(2), 0))
  };
  const store = configureStore(services, [storeSpy]);
  const component = mount(<App store={store} />);

  component.find('#increase-remotely').simulate('click');

  return expectRedux(store)
    .toDispatchAnAction()
    .matching({ type: 'SET_COUNTER_FROM_REMOTE', counter: 2 });
});
```

I no longer need to work around asynchronicity by polling or flushing the event queue. Instead, I can even write tests that are similar in scope to browser tests, but don't rely on browser timings and use the "domain events" that you dispatch as actions. This makes large tests a little more bearable, as the error message will quickly point to where the test is failing.

<small>An integration test that fills a form, submits it and waits for two events to be dispatched before asserting that the component correctly reflects the new state (from the [`redux-saga-example`](https://github.com/rradczewski/expect-redux/blob/master/examples/redux-saga-example/src/App.test.js#L30-L50))</small>
```js
it("will work with correct credentials", async () => {
  Api.authorize.mockResolvedValue("SOME_TOKEN");

  fillInUserName("MY_USER");
  fillInPassword("MY_PASSWORD");
  submitForm();

  await expectRedux(store)
    .toDispatchAnAction()
    .matching({
      type: "LOGIN_REQUEST",
      user: "MY_USER",
      password: "MY_PASSWORD"
    });

  await expectRedux(store)
    .toDispatchAnAction()
    .ofType("LOGIN_SUCCESS");

  expect(component.text()).toContain("Thanks for logging in.");
});
```

## The case for `expect-redux`

I really appreciate the expressiveness that `expect-redux` adds to my tests, but it also got me thinking about testing scopes a lot. With tests that closely resemble browser tests in their scope, but at the same time are much faster and without the fragility of automating an actual browser, I can easily write acceptance tests for a whole feature without worrying about the implementation details.

But even outside of these feature tests, I found that whenever asynchronicity became a necessary design consideration, `expect-redux` helped me keep my tests readable and made them less coupled to the actual implementation. I was quite impressed myself to find out that the feature tests I wrote for the [examples](https://github.com/rradczewski/expect-redux/tree/master/examples) are completely identical, no matter if I was using  [`redux-observable`](https://github.com/rradczewski/expect-redux/blob/master/examples/redux-observable-example/src/login.epic.with-expect-redux.test.js) or [`redux-saga`](https://github.com/rradczewski/expect-redux/blob/master/examples/redux-saga-example/src/loginFlow.saga.with-expect-redux.test.js) as a process manager!

Make sure to give it a try and let me know what you think!

- [`expect-redux` on <span class="icon icon--github">{% include icon-github.svg %}</span> GitHub](https://github.com/rradczewski/expect-redux)
  - [`/examples`](https://github.com/rradczewski/expect-redux/tree/master/examples) has examples for `redux-thunk`, `redux-saga` and `redux-observable`
  - [API docs](https://github.com/rradczewski/expect-redux#api)
- [`expect-redux` on NPM](https://www.npmjs.com/package/expect-redux) [<img src="https://img.shields.io/npm/v/expect-redux.svg" alt="version badge on npm" class="reset">](https://www.npmjs.com/package/expect-redux)

[^1]: [`middleware.js#L40-L48`](https://github.com/redux-saga/redux-saga/blob/master/packages/core/src/internal/middleware.js#L40-L48)
[^2]: [`createEpicMiddleware.js#L51-L65`](https://github.com/redux-observable/redux-observable/blob/master/src/createEpicMiddleware.js#L51-L65)
