---
layout: post
title: "On hooks, cypress and the fabric of the universe"
image: "assets/hooks-cypress-and-the-fabric-of-the-universe.jpg"
---

I can't quite explicate what it is, but to this day, *React hooks* and *cypress* leave me with the slight terror that the fabric of our universe has been tinkered with. I'm bringing some receipts, but I'm not sure what my final verdict is.

# The hooks situation

When hooks came out in 2018, Daniel was writing [his book on React and TDD](https://www.packtpub.com/eu/web-development/mastering-react-test-driven-development), for which I was doing the technical review. We got excited about this novelty, both in a positive and negative way. On the one hand, a lot of chapters in the book suddenly needed to be rewritten to work with hooks (Daniel rightfully anticipated that hooks would be _the next big thing_), while on the other hand, it seemed like a new approach to writing React that could make for much more conscise code and applications.

The thing that stuck with me though was the feeling that React had been toying with something that was up until then the job of the interpreter: **the callstack**.

## Detour into JS history

JavaScript is quite infamous for its novelty approaches when it comes to scoping and call-site contextualisation. Chances are, if you've programmed in JavaScript about 10 years ago, you will remember providing `this` as an additional parameter to a library function that takes a callback, so `this` inside the callback would be properly scoped to the closure in which the callback was defined.

```js
// https://api.jquery.com/jQuery.ajax/
Component.prototype.send = function() {
  this.status = "loading";
  $.ajax({ url: "test.html", context: this }).done(function() {
    this.status = "loaded";
  });
};
```

I further guess that if you've written React in the age-of-classes about 5 years ago, you also might at some point wrote prototype methods that are explicitly being rebound to the instance using `.bind(this)` to pin the `this` binding later.

```js
class Counter extends React.Component {
  constructor(props) {
    super(props); 

    this.handleClick.bind(this);
  }

  handleClick() {
    // ...
  }
}
```

Both approaches work around a particular language aspect of javascript: A method's `this` is depending on the call-site, not the site of definition. I understand how tedious and very alien this seems, especially if you come from a language where `this` always refers to the instance that was being called like Java. At the same time though, it's a pretty universal concept of the language, one that libraries provided universal workarounds for that were applicable in other libraries as well. The important thing about this: **My brain's pattern matching worked, no matter if I was doing this in `jQuery` 10 years ago, `knockoutJS` 8 years ago, or `React` 5 years ago.** Nowadays,
this issue has further been taken care of with the introduction of [arrow-functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and its distinctive syntax.

## *Enter React hooks*

React hooks are magic. In a bad way my gut tells me. To cut it short, it effectively is the framework hiding global state from me, and linters enforcing that I don't accidentally mess with it in "the wrong way". Don't get me wrong, they're a pleasure to use and I wouldn't trade them for the verbosity of how we used to use classes or *higher-order-functions* whenever we needed local state. **At the same time they introduce a mechanism that I would've usually expected to be universally present in a language, rather than specifically bound to a framework.**

## Deep Dive: How they work

React hooks introduce what I call a "shadow stack" (the official docs call it "memory cells"). I'm probably vastly over-simplifing it, but each call to a function like `useState` is basically assigned a number, from the first one at the top of the render tree to the last ones at the leaves. A call to `useState` will always work on the "memory cell" with that number, and thus provide specific "local" state to a call of a function that usually wouldn't be able to have state due to the design of the language.

```jsx
const MyCounter = ({initialValue}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <span>Count: {value} </span>
      <button onClick={() => setValue(value+1)}>+</button>
    </div>
  );
}

const App = () => (
  <div>
    <MyCounter initialValue={1}/>
    <MyCounter initialValue={2}/>
  </div>
);
```

In the old days, you would've written a `class`-Component with `this.state = { value: props.value }` in the constructor, and subsequently updated the state via `this.setState({value: this.state.value+1})`.

With hooks, each "instance" of `MyCounter` has its own global "memory cell", or "stack index", in which it stores `value`.

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

const MyComponent = () => {
  const [foo, setFoo] = useState(1);
  const [bar, setBar] = useState("A");

  return foo + bar;
};

const renderApplication = () => {
  // Set stackIndex to 0 to start a fresh render
  stackIndex = 0;

  return `ComponentA: ${MyComponent()}` + "\n" + `ComponentB: ${MyComponent()}`;
};
```

In the naive implementation, you can see that there are two important assumptions that make this work:

1. `useState` is always called in the order it was called initially when calling `renderApplication`. It is never called **conditionally** or a **dynamic number of times**.
2. `stackIndex` is always reset before any call to `useState` takes place.

The React docs call this the ["Rules of Hooks"](https://reactjs.org/docs/hooks-rules.html) and there's a reason the docs are full of warnings about you respecting these Rules. If you call `useState` conditionally or in a loop, React couldn't possibly match the call to its correct `stackIndex` and at worst you'd get the wrong "cell" content. Furthermore, as React can only keep track of the `stackIndex` inside its own renderloop, the function is worthless outside of it and at worst will further produce undefined behaviour in every part of the application where `useState` is used.

This threat made it necessary to introduce [a linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) that comes with **create-react-app**. The linter plugin analyses your source code – something React can't possibly do at runtime because it doesn't have access to the interpreter or its AST – and errors if you accidentally violate one of these two rules. They further added warnings for both [rule #1](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react-reconciler/src/ReactFiberHooks.js#L240-L285) and [rule #2](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react/src/ReactHooks.js#L23-L35), although the former elaborate warning regarding unconditional calls to `useState` is stripped in production and React only errors when it used [more](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react-reconciler/src/ReactFiberHooks.js#L590-L593) or [fewer](https://github.com/facebook/react/blob/235a6c4af67e3e1fbfab7088c857265e0c95b81f/packages/react-reconciler/src/ReactFiberHooks.js#L474-L478) hooks than in the previous render.


```jsx
import React, { useState } from "react";

const MyBarComponent = () => {
  const [bar, setBar] = useState("bar?");

  return <div>Bar {bar}</div>;
};

const MyFooComponent = () => {
  const [woop, setWoop] = useState("woop?");

  return (
    <div>
      {woop} <button onClick={() => setWoop("woop!")}>Set</button>
      {woop == "woop!" && MyBarComponent()}
    </div>
  );
};

const App = () => (
  <div className="App">
    <MyFooComponent />
    <MyFooComponent />
  </div>
);

export default App;
```

Running this in development will have React yield a proper error and a warning, telling me that the order of hooks differed from the previous render. It can't tell me more than that – it doesn't have any way of understanding my code and what the culprit is.

![The error message React yields when it discovers a disparity in the usage of hooks](/assets/hooks-cypress-and-the-fabric-of-the-universe--react-error.png)

## Pattern mismatch - expected "functions" but got "hooks" instead

React isn't able to reason about me misusing the library at this point, and it never will be able to – it just doesn't have that information at its disposal. React is a library like any other, it doesn't have access to the interpreter and its AST, nor any reasonable capabilities to work around this at compile-time without massively inconveniencing those who are using it.

**Most importantly though**, my brain's pattern matching now fails me. Whenever I'm using React nowadays, my brain is fixated on finding functions starting with **<span style="color: red !important">`use...`</span>**, because those functions exert different behaviour than any other function in javascript. If any major library starts breaking the convention and starts to name their hooks differently than **<span style="color: red !important">`use...`</span>**, my brain will need to switch to high-alert for any function, as it could be a hook that doesn't work anything like a function call.

Not only has React tinkered with designs that are exclusive to interpreters and compilers, making it necessary to use linters to make it dev-user-friendly, it has also massively impacted my capability of reading and understanding code.

*If I could've justified another detour at this point, I would've loved to implement hooks in clojurescript using `with-redef` and `defmacro` to show how another language with the required capabilities available to libraries could've solved this (and an ecosystem where that sort of behaviour wouldn't be unheard of)*

<hr/>

# The cypress situation

cypress has entered the space of browser-testing tools with quite a few interesting features: not only does it come in a neat package that makes getting started increadibly easy, but finally there's a browser-testing tool that caters to the interactivity that browser-testing and subsequently -debugging warrant for. 

After using it for a bit in a recent project, I've been pleasantly surprised by the means it gives me to write and debug tests, but most importantly to me, by how easy it was to set it up on CI and provide meaningful feedback to me should a test fail. 

I used selenium in that project before and found it helpful to have the tight integration with the backend JVM that selenium offers, as it allowed me to mock third parties without having to add a seam. **I couldn't make a solid case for selenium though**, as not only the developers weren't familiar with java and selenium, but also because the version we were able to use was vastly outdated, making the former a much bigger issue than usually.

It wasn't long before I found myself at odds with cypress' API though: We had to put that whole legacy SPA under test, a fragile piece of software that wasn't build with testability in mind. 

## cypress and the reinvention of the wheel

Cypress automates browsers. It does this by injecting itself into the website under test and running your tests right there with time-travelling capabilities and native access to the browser DOM and its javascript APIs. Most importantly though, its API is build with the fragility of a browser-based test in mind: all methods that instrument or query the browser are asynchronous and retry automatically should they not yet find the element in question – a super handy feature indeed!

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
  })
});
```

The result is a very conscise test that hides all the flakiness of a classic browser test in the framework 😍.

The problem, which is explained [at length](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Promises) to warn you about it in its documentation, is that in order to achieve this, cypress reinvents asynchronous operations in javascript. In the name of dev-exp, cypress avoids [`then`-chains](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Noisy-Promise-demonstration-Not-valid-code) by queueing all your calls to its API and only executing them one-by-one.

An assertion always needs to be chained to these "commands", so it can properly be retried and only fails if cypress runs out of retries.

```js
cy.get(".result__a:first")
  .its("href")
  .should("contain", "mdn.io");
```

Effectively, cypress reimplements flow-control of my test hidden in its abstractions. This will work fine, especially as long as I can change the system-under-test so I don't need to conditionally branch off or iterate over a collection of elements and act on them, but it will again break my brain's pattern matching as soon as I need to work around cypress' own command queue.

Let's use an (again, oversimplified) example to illustrate the point. Let's say I need to find the first `li` element that only has a single `a` as its child and run an assertion on it.

```js
context("Basic flow control in cypress", () => {
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

Not knowing that cypress runs commands asynchronously, and without bothering to read the documentation first, I implemented this like I would do in selenium or in native browser javascript where DOM access is synchronous:

```js
  specify("TLDR, this is like selenium, right?", () => {
    const lis = cy.get("li");
    for (let li of lis) {
      const as = cy.get(li).find("a");
      if(as.length === 1) {
        expect(as[0].innerHTML).to.equal("2");
        return;
      }
    }
    throw new Error("Didn't find the li");
  });
```

I quickly noticed that this is not how cypress works at all – it's asynchronous after all and I should go back and read the documentation in order to not come off as absolutely ignorant while I'm making a point about cypress 😅!

So off I went, adding `await` and `async` to my code. After all, cypress commands return something with a `then`-method  and my brain immediately pattern-matches that to `Promise` and thus `async`/`await`!

```js
  specify("async/await to the rescue", async () => {
    const lis = await cy.get("li");
    for (let li of lis) {
      const as = await cy.get(li).find("a");
      if (as.length === 1) {
        expect(as[0].innerHTML).to.equal("2");
        return;
      }
    }
    throw new Error("Didn't find the li");
  });
```

I then learned that `cy.find`, unlike `cy.get`, does not return a `then`-able, or `cy.get` can't make sense out of `li` or something else. In any case `as` didn't contain the `a`'s I was expecting. A `console.log` revealed that `lis` is a list of DOM-nodes though, so I was making progress at least – an ugly test is slighly better than no test.

I reluctantly resorted to the native dom selectors, fully knowing that not only will I have to jump between abstractions, but I will also loose the retry-ability of cypress that I appreciated so much earlier.

```js
  specify("Iterating with native selectors", async () => {
    const lis = await cy.get("li");
    for (let li of lis) {
      const as = li.querySelectorAll("a");
      if (as.length === 1) {
        expect(as[0].innerHTML).to.equal("2");
        return;
      }
    }
    throw new Error("Didn't find the li");
  });
```

While this test finally works as expected, I had to make a big sacrifice already. I lost not only the retries, but also had to note down an exception to my brain's pattern matching: **"Some methods in cypress look and behave enough like Promises that await/async works, but others won't. Be on the lookout!"**. 

That note went right next to the one reading **"Even though cypress runs in the browser, and it uses jquery-like selectors (or even jquery), unlike any other interaction with the DOM you're used to, all of cypress' DOM commands are async"**.

At this point, I deleted my naive attempts and tried to understand how an idiomatic implementation would look like. I've been around when JavaScript was notoriously famous for its "callback hell", and I sure knew my patterns to work with that. I figured a recursively called function that puts commands onto cypress' command queue only right as they were needed in succession would help:

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
          .then(as => {
            if (as.length === 1) return resolve(as[0]);
            return checkNext(lis.slice(1));
          });
      };

      cy.get("ul li").then(checkNext);
    });
});
```

✅, again! **Still, the final tally left me disillusioned and frustrated.** As I tried to pay more respect to cypress and its idiomatic way of instrumenting my browser, the test suffered from the workarounds I had to employ to make it work. 

Cypress might be an amazing tool if you can easily change the system-under-test to be easier to test, but it failed me at a fundamental level: **My control over my tests and the flow-control patterns my brain is used to from any other library I've been familiar with in the javascript ecosystem.**

![Screenshot showing the first test failing](/assets/hooks-cypress-and-the-fabric-of-the-universe--cypress.png)

*(If you want the right answer to a question, post the wrong one. I think I've done my part here, so if anyone can help me I'd highly appreciate a heads-up at <a href="mailto:cypress-hell@craftswerk.io">cypress-hell@craftswerk.io</a>)*

## The final verdict?