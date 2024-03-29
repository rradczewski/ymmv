---
layout: post
title: "On hooks, cypress and the fabric of the universe"
image: "assets/hooks-cypress-and-the-fabric-of-the-universe.jpg"
hide_reading_time: true
---
_React Hooks_ and _Cypress_ both require you to change the way you write code, most drastically to not use core features of the language JavaScript itself, like loops, conditionals and async/await. It's worth understanding why, so let's take a peek under the hood and find out.

Initially, this post was an old-man-yelling-at-cloud-esque essay, on how _React hooks_ and _Cypress_ break my capabilitiy to quickly read code, and to pattern-match it to things I've seen before. Then the world suffered on a scale  unimaginable, and my rantings turned irrelevant and tone-deaf in this grand scheme of things.

I kept it in my drafts and occasionally shared it with people. Not because it was a particular good rant, but rather because it proved useful in learning just how both Hooks and Cypress work, and what to watch out for when working with them. I figured it's worth publishing the helpful parts, eventually turning my rants into something positive.

*If you've been as privileged as I am, and you've found yourself to be employed during these times – albeit a bit checked-out maybe, but paid well; maybe confined at home, but "remote", safe; and among the first of the world population to be vaccinated – I kindly ask you to consider sharing part of that fortune with others, e.g. by donating to grassroots initiatives that help where it counts. See [SoGive UK](https://www.sogive.org) or [Betterplace](https://www.betterplace.de) for more. 

-------

Both [React hooks](https://reactjs.org/docs/hooks-reference.html) and [Cypress](https://cypress.io) are well-received tools in the JavaScript communities, and rightfully so. Each brings their novel approach to solving a commonly cumbersome topic that developers face, namely state management and browser-testing respectively. This in itself makes working with them highly enjoyable.

However, the difficulty in mastering both of them boils down to the way they accomplish their feats: React hooks introduce local call-dependent state to functions that shouldn't have state in the first place, and Cypress implements its own command loop on top of JavaScript's own that is just different enough from the real one that I get confused. 

The following essay will be a deep dive into the hows and whys of React hooks and Cypress, the assumptions and stated reasons of why they're implemented that way and ultimately what to watch out for when working with them.

# The hooks situation

When hooks came out in 2018, Daniel was writing [his book on React and TDD](https://www.packtpub.com/eu/web-development/mastering-react-test-driven-development), for which I was doing the technical review. We got excited about this novelty, both in a positive and negative way. On the one hand, a lot of chapters in the book suddenly needed to be rewritten to work with hooks (Daniel rightfully anticipated that hooks would be _the next big thing_), while on the other hand, it seemed like a new approach to writing React that could make for much more concise code and thus applications.

What stuck with me though was the feeling that React had been toying with something that up until then was the job of the interpreter: **the callstack**.

## A detour into JS history

JavaScript is quite infamous for its novelty approaches when it comes to scoping and call-site contextualisation. Chances are that, if you've programmed in JavaScript about 10 years ago, you will remember providing `this` as an additional parameter to a function that takes a callback so `this` inside the callback would be properly scoped to the closure in which the callback was defined.

```js
// https://api.jquery.com/jQuery.ajax/
Component.prototype.send = function() {
  this.status = "loading";
  $.ajax({ url: "test.html", context: this }).done(function() {
    this.status = "loaded";
  });
};
```

I further guess that if you've written React in the age-of-classes about 5 years ago, you also might at some point have written prototype methods that are explicitly being bound to the instance using `.bind(this)` to pin the `this` binding later.

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // ...
  }
}
```

Both approaches are necessary because of a particular language aspect of JavaScript: A method's `this` is depending on the call-site, not the site of the method definition. I understand how tedious and very alien this seems, especially if you come from a language where `this` always refers to the instance that was being called like Java. At the same time though, it's a pretty universal concept of the language, one that libraries provided universal solutions for that were translatable to other libraries as well. The important thing to note here: **My brain's pattern matching worked, no matter if I was doing this in `jQuery` 10 years ago, `knockoutJS` 8 years ago, or `React` 5 years ago.** Explaining this to students at any point in time enabled them to work in any of the other libraries. Nowadays,
this issue has further been taken care of with the introduction of [arrow-functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and their distinctive syntax.

## What are React Hooks essentially?

React hooks are magic. To cut it short, it effectively is the framework hiding global state from me, and linters and heuristics preventing me from accidentally messing with it in "the wrong way". Don't get me wrong, they're a pleasure to use and I wouldn't trade them for the verbosity of how we used to use classes whenever we needed local state. **At the same time they introduce a mechanism that I would've usually expected to be universally present in a language, rather than specifically bound to a framework.**

## Deep Dive: How hooks work

React hooks introduce so called "memory cells". I'm vastly over-simplifing it as the actual implementation uses linked lists, but you can think of it like this:

Each call to a function like `useState` in a React component is assigned a number from a sequence outside of your application code. **A call** to `useState` will always work on the "memory cell" with that number, and thus provide specific "local" state to that particular call of a function that usually wouldn't be able to have state due to the design of the language.

That's right, hooks makes it so that **every call** of a hooks-function has its own specific local state. Not only does the function have an identity, suddenly the call itself inside the rendering context has an identity that is relevant to the functioning of the application. Even for impure functions, this is quite a new category of impurity!

```jsx
const MyCounter = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <span>Count: {value} </span>
      <button onClick={() => setValue(value + 1)}>+</button>
    </div>
  );
};

const App = () => (
  <div>
    <MyCounter initialValue={1} />
    <MyCounter initialValue={2} />
  </div>
);
```

In the old days, you would've written a `class`-Component with `this.state = { value: props.value }` in the constructor, and subsequently updated the state via `this.setState({value: this.state.value+1})`.

With hooks, each call to the function `MyCounter` has its own "memory cell" in which it stores `value`. `MyCounter` effectively becomes an instance method to an invisible stateful instance.

The concept can be easier explained with a naive implementation (see [`ReactHooks.js`](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react/src/ReactHooks.js) and [`ReactFiberHooks.js`](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react-reconciler/src/ReactFiberHooks.js#L556) for the actual magic):

```js
// Global stack and stackIndex that `useState` and renderApplication can both access
const stack = [];
let stackIndex = -1;

const useState = initialValue => {
  // If the value hasn't been set yet, initialize it.
  if (!stack[stackIndex]) stack[stackIndex] = initialValue;

  // Retrieve the stackIndex, and increment it for the next useState call
  let i = stackIndex++;

  const value = stack[i];
  const setter = val => (stack[i] = val);
  return [value, setter];
};

const MyCounter = () => {
  const [count, setCount] = useState(1);

  return "Count: " + count;
};

const App = () =>
  `Counter A: ${MyCounter()}` + "\n" + 
  `Counter B: ${MyCounter()}`;

const render = rootComponent => {
  // Set stackIndex to 0 to start a fresh render
  stackIndex = 0;

  return rootComponent();
};

render(App);
```

In the naive implementation, you can see that there are two important assumptions that make this work:

1. `useState` is always called in the order it was called initially when calling `render`. It is never called **conditionally** or a **dynamic number of times**.
2. `stackIndex` is always reset before any call to `useState` takes place.

The React documentation calls this the ["Rules of Hooks"](https://reactjs.org/docs/hooks-rules.html) and there's a good reason the docs are full of warnings and reminders about respecting these *Rules*. If you were to call `useState` conditionally or in a loop, React couldn't possibly match the call to its correct `stackIndex` and you might end up getting the **wrong** "cell's" content. Furthermore, as React can only keep track of the `stackIndex` inside its own render-loop, hooks like `useState` are useless outside of it and at worst will further produce undefined behaviour in every part of your application where they are used.

This threat made it necessary to introduce [a linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) that comes e.g. with **create-react-app**. This linter plugin analyses your source code – something React can't possibly do at runtime because it doesn't have access to the interpreter or its AST – and errors if you accidentally violate one of these two rules. React further added warnings for both [rule #1](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react-reconciler/src/ReactFiberHooks.js#L240-L285) and [rule #2](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react/src/ReactHooks.js#L23-L35), but only in dev-mode. The elaborate warnings regarding unconditional calls to `useState` are stripped out in production, where React then only errors whenever it finds that it used [more](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react-reconciler/src/ReactFiberHooks.js#L590-L593) or [fewer](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react-reconciler/src/ReactFiberHooks.js#L474-L478) hooks than in the previous render.

```jsx
import React, { useState } from "react";

const MyChildComponent = () => {
  const [childValue, setChildValue] = useState("Child Value");

  return <div>ChildComponent: {childValue}</div>;
};

const MyParentComponent = () => {
  const [shouldExpand, setShouldExpand] = useState(false);

  return (
    <div>
      <button onClick={() => setShouldExpand(true)}>Expand</button>
      {shouldExpand && MyChildComponent()}
    </div>
  );
};

const App = () => (
  <div className="App">
    <MyParentComponent />
    <MyParentComponent />
  </div>
);

export default App;
```

Running this in development will have React yield a proper error and a warning, telling me that the order of hooks differed from the previous render and which hooks it found. It can't tell me more than that – it doesn't have any way of understanding my code and what the culprit is.

![The error message React yields when it discovers a disparity in the usage of hooks](/assets/hooks-cypress-and-the-fabric-of-the-universe--react-error.png)

*For the curious: This is caused by using `MyChildComponent` by calling it directly, thus making its return value directly part of the rendering tree of `MyParentComponent`. If you use `<MyChildComponent />` instead of calling it directly via `MyChildComponent()`, React will create a new context with its own "memory cells", so the error won't happen. While this certainly mitigates the error happening in practice, the systemic problems I lay out around learning these concepts, still persist.*

## Pattern mismatch - expected "functions" but got "hooks" instead

React isn't able to reason about me misusing the library at this point, and it never will be able to – it just doesn't have that information at its disposal. React is a library like any other, it doesn't have access to the interpreter and its AST, nor any reasonable capabilities to work around this at compile-time without massively inconveniencing those who are using it.

**More importantly though, my brain's pattern matching now fails me**. Whenever I'm using React nowadays, my brain is fixated on finding functions starting with **<span style="color: red !important">`use...`</span>**, because those functions exert different behaviour than any other function in JavaScript. If any major library starts breaking the convention and starts to name their hooks differently than **<span style="color: red !important">`use...`</span>**, my brain will need to switch to high-alert for any function, as it could be a hook that doesn't work anything like a function call.

_If I could've justified another detour at this point, I would've loved to implement hooks in clojurescript using `with-redef` and `defmacro` to show how another language with the required capabilities available to libraries could've solved this and an ecosystem where that sort of behaviour wouldn't be unheard of_

## The case for standard APIs

The React ecosystem had quite a few prominent state management libraries over its existence. Some of them, like [`refunk`](https://github.com/jxnblk/refunk) or [`unstated`](https://github.com/jamiebuilds/unstated) have either been deprecated or have been reimplemented using hooks. [redux](https://redux.js.org/) on the other hand, is very much alive and has evolved standards (see [`redux-toolkit`](https://redux-toolkit.js.org/introduction/quick-start)) that help onboarding someone new onto a project and support my brain's pattern matching when looking at code. 

The beauty of `redux` and the other libraries lies not only in how easy they are to comprehend, but also how you can test them. To a certain extend, they all use the language like it was designed, so testing them requires only a standard toolset like `jest` or `mocha`.

Hooks and with them React fiber on the other hand required a lot of changes to existing tests because of the way asynchronicity and React's implementation had to suddenly be factored in. Not only did this break `shallow`-rendering, [`act`](https://reactjs.org/docs/test-utils.html#act) caused quite a lot of confusion at first because of odd error messages that couldn't be explained or removed easily (see e.g. [this issue](https://github.com/facebook/react/issues/15379)).

<hr/>

# The Cypress situation

[Cypress](https://cypress.io) has entered the space of browser-testing tools with quite a few interesting features: not only does it come in a neat batteries-included-package with a UI that makes getting started increadibly easy, but finally there's a browser-testing tool that caters to the interactivity that browser-testing and subsequently -debugging warrant for.

After using it for a bit in a recent project, I've been pleasantly surprised by the means it gives me to write and debug tests and most importantly to me, by how easy it was to set it up on CI and make it provide meaningful feedback to me should a test fail.

I used *Selenium* in that project before and found it helpful to have the tight integration with the backend JVM that selenium offers, as it allowed me to mock third parties without having to add a seam or other workarounds. **I still couldn't make a solid case for selenium though**, as not only the developers weren't familiar with java and selenium, but also because the version we were able to use was vastly outdated, making the former a much bigger issue than usually

It wasn't long before I found myself at odds with Cypress' API though: we had to put that whole legacy SPA under test, a fragile piece of software that wasn't build with testability in mind.

## Why Cypress hat to reinvent the wheel

Cypress automates browsers. It does this by injecting itself into the website-under-test and running the tests right there, with time-travelling capabilities and native access to the browser DOM and its JavaScript APIs. Its API is build to be resilient, with the fragility of a browser-based test in mind: all methods that instrument or query the browser are asynchronous and retry automatically should they not find the element in question – a super handy feature indeed!

```js
context("A simple example", () => {
  test("it types in a search query", () => {
    // Waits until duckduckgo.com has been loaded successfully
    cy.visit("https://duckduckgo.com/");
    // Looks for the element and retries until it's there
    cy.get("#search_form_input_homepage")
      // Proceeds to type in text one-by-one
      .type("async/await ES7");
    // Looks for the element and retires until it's there
    cy.get("#search_button_homepage")
      // clicks it
      .click();

    // Waits/retries until the first search result is there
    cy.get(".result__a:first")
      // clicks it
      .click();

    cy.location()
      .its("href")
      .should("contain", "mdn.io");
  });
});
```

The result is a very conscise test that hides all the flakiness of a classic browser test in the framework 😍.

The problem is explained [at length](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Promises) in its documentation. 
In order to achieve this resilience, Cypress reinvents asynchronous operations in JavaScript. In the name of dev-user-experience, Cypress avoids [`then`-chains](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Noisy-Promise-demonstration-Not-valid-code) by queueing all your calls to its API in its own "event-loop" and only executing them afterwards one-after-another.

An assertion always needs to be chained to these calls so it can properly be retried and only fails once Cypress runs out of retries.

```js
cy.get(".result__a:first")
  .its("href")
  .should("contain", "mdn.io");
```

Effectively, **Cypress reimplements flow-control of my test, hidden in its abstractions**. This will work just fine as long as I can adapt the system-under-test in a way so I don't need to conditionally branch off or iterate over a collection of elements in my tests, **but it will again break my brain's pattern matching as soon as my tests need basic imperative flows because I can't change the system-under-test accordingly.**

```js
context("Cypress", () => {
  specify("Basic flow control", () => {
    console.log("Before Loop")

    for (let i = 0; i < 10; i++) {
      cy.window().then(window => console.log("In Loop "+i));
    }

    console.log("After Loop")
  });
});

// Outputs:
//  Before Loop
//  After Loop
//  In Loop 0
//  ...
//  In Loop 9
```

The snippet above and problem it has is something deeply ingrained into me, as it's a issue you frequently run into when your code is executed asynchronously, but you're trying to work with it synchronously. JavaScript has taken care of it through `async`/`await`, but cypress adds yet another layer to this.

Let's use an (again, oversimplified) example to illustrate the point. Let's say I need to find the first `li` element that only has a single `a` as its child and run an assertion on it.

```js
context("Basic flow control in Cypress", () => {
  before(() => {
    cy.window().then(window => {
      window.document.write(`
        <ul>
          <li>
            <a>1a</a>
            <a>1b</a>
          </li>
          <li>
            <a>2</a>
          </li>
          <li>
            <a>3</a>
          </li>
        </ul>
      `);
    });
  });
});
```

Not knowing that Cypress runs commands asynchronously, and without bothering to read the documentation first, I implemented this like I would do in selenium or in native browser JavaScript where DOM access is synchronous:

```js
specify("TLDR, this is like selenium, right?", () => {
  const lis = cy.get("li");
  for (let li of lis) {
    const aElements = cy.get(li).find("a");
    if (aElements.length === 1) {
      expect(aElements[0].innerHTML).to.equal("2");
      return;
    }
  }
  throw new Error("Didn't find the li");
});
```

Naturally, one should've known that these commands are asynchronously executed, so off I went, adding `await` and `async` to my code. \Cypress commands return something with a `then`-method so naturally I pattern-match that to `Promise` and thus `async`/`await`!

```js
specify("async/await to the rescue", async () => {
  const lis = await cy.get("li");
  for (let li of lis) {
    const aElements = await cy.get(li).find("a");
    if (aElements.length === 1) {
      expect(aElements[0].innerHTML).to.equal("2");
      return;
    }
  }
  throw new Error("Didn't find the li");
});
```

I then learned that `cy.find`, unlike `cy.get`, does not return a `then`-able, or `cy.get` can't make sense out of `li` or something else – the error message wasn't really helpful in pinning this down. 

In any case, `aElements` didn't contain the `<a>`'s I was expecting. A `console.log` revealed that `lis` is a list of DOM-nodes though, so I was making progress at least – an ugly test is slighly better than no test I figured.

I reluctantly resorted to using the native dom selectors, fully knowing that not only will I have to jump between abstractions, but I will also lose the retry-ability of Cypress that I appreciated so much earlier.

```js
specify("Iterating with native selectors", async () => {
  const lis = await cy.get("li");
  for (let li of lis) {
    const aElements = li.querySelectorAll("a");
    if (aElements.length === 1) {
      expect(aElements[0].innerHTML).to.equal("2");
      return;
    }
  }
  throw new Error("Didn't find the li");
});
```

While this test finally works as expected, I had to make a big sacrifice already. I lost not only the retries, but also had to note down an exception to my brain's pattern matching: **"Some methods in Cypress look and behave enough like Promises so that await/async works, but others won't. Be on the lookout!"**.

That mental note went right next to the one reading **"All of Cypress' (DOM) commands are async, even though Cypress runs in the browser, and it uses jquery-like selectors (or even jquery itself under the hood). This is unlike any other interaction with the DOM I'm used to"**.

At this point, I deleted my naive attempts and tried to understand how an idiomatic implementation would look like. I've been around when JavaScript was still notoriously famous for its "callback hell", and I sure knew my patterns to work with that. I figured that a recursively called function that puts commands onto Cypress' command queue only in succession would work:

```js
  specify("Hello darkness my old friend", async () => {
    const elem = await findFirstElementWithASingleChild();
    expect(elem.innerHTML).to.equal("2");
  });

  const findFirstElementWithASingleChild = () =>
    new Promise((resolve, reject) => {
      const checkNext = lis => {
        if (lis.length === 0) return reject(new Error("No li left to check"));

        const elemToCheck = lis[0];
        cy.get(elemToCheck)
          .find("a")
          .then(aElements => {
            if (aElements.length === 1) return resolve(aElements[0]);
            return checkNext(lis.slice(1));
          });
      };

      cy.get("ul li").then(checkNext);
    });
});
```

Green again! **Still, the final tally left me disillusioned and frustrated.** As I tried to pay more respect to Cypress and its idiomatic way of instrumenting my browser, the test suffered from the workarounds I had to employ to make it work.

Cypress might be an amazing tool if you can easily change the system-under-test to be easier to test the way it wants you to test, but it failed me at a fundamental level: **The basic flow-control patterns my brain is used to from any other library I've been familiar with in the JavaScript ecosystem are not available when I'm using Cypress.**

![Screenshot showing the first test failing](/assets/hooks-cypress-and-the-fabric-of-the-universe--cypress.png)

With [`cypress-promise`](https://github.com/NicholasBoll/cypress-promise), there exists a library that enables Cypress to be used with `async`/`await`, enabling me to write tests the way I think they are the easiest to read. I would still have liked to see Cypress embrace the native `Promise` concepts as much as other tools like [TestCafe](https://devexpress.github.io/testcafe/) have done. 

<hr />

# The final verdict?

Let me finish by saying that the purpose of this essay isn't to discourage anyone from using either React hooks or Cypress. They're in their own way fantastic evolutions of the development tooling we already know. 

React hooks are a giant leap forwards, away from convoluted `class`-Components and  HoC-components, to more expressive APIs and components with locally isolated state. Cypress is a refreshing take on browser-testing, which has been overwhelming enough with all its complexity and pitfalls that Selenium, the defacto standard, hasn't really managed to address so far.

But the aspects that make both great tools aren't those that I'm cross with, but the fact that they require you to learn and use a concept that is only valid inside of their own ecosystem and doesn't translate to other frameworks or libraries that don't hide their complexity in favor of supposed developer experience.

React hooks could've been implemented by explicitly passing a `context` to them. While that would've made it slightly more verbose, I'm convinced it would've ultimately benefited the experience of working with them. People learning React then wouldn't need to learn any new rules that forbid calling some methods conditionally, but instead learn about universal concepts for managing global and local state they could apply in other systems.

Cypress could've made retries not a hidden feature of their API, but an explicit concept that developers need to understand and respect. In turn, this would have made it possible to provide a universally understood `Promise` and `async`/`await`-compatible API. People learning Cypress would not have to learn another way of handling asynchronicity, but instead would learn a generally supported approach that easily translates to other libraries and frameworks.

I will certainly be using and teaching both of them, but for the time being, I hope these "peeks behind the curtain" offer some deeper insights into how both React hooks and Cypress work and might help anyone should they encounter any of the pitfalls outlined here.

*Thank you [@d_ir](https://twitter.com/d_ir), [@marcoemrich](https://twitter.com/marcoemrich) and [@LineyJane](https://twitter.com/LineyJane) for your invaluable feedback and the discussions over this essay.*