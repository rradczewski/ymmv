---
layout: post
title: "On Hooks, Cypress and other fauxpas"
---

To this day – and I can't quite explicate what exactly it is – React hooks and cypress leave me with the slight terror that the fabric of our universe was being tinkered with. I'm bringing some receipts, but I'm not sure what my final verdict is.

When hooks came out in 2018, Daniel was writing [his book on React and TDD](https://www.packtpub.com/eu/web-development/mastering-react-test-driven-development), for which I was doing the technical review. We got excited, both in a positive and negative way, about this change. On the one hand, a lot of chapters in the book suddenly needed to be rewritten to work with hooks (Daniel rightfully anticipated that hooks would be _the next big thing_), on the other hand, it seemed like a vanity change that could make for much more conscise code.

One thing that stuck was the feeling that React had been toying with something that was up until then the job of the interpreter: the callstack.

JavaScript is quite (in-)famous for its novelty approaches when it comes to scoping and call-site contextualisation. Everyone who programmed in JavaScript about 10 years ago remembers providing `this` as an additional parameter to a function that takes a callback, so `this` inside the callback would be properly scoped to the closure in which the callback was defined.

```js
// https://api.jquery.com/jQuery.ajax/
Component.prototype.send = function() {
  this.status = "loading";
  $.ajax({ url: "test.html", context: this }).done(function() {
    this.status = "loaded";
  });
};
```

I further assume that everyone who's written React in the age-of-classes (so 5 years ago?), but also ES6 syntax, also might has at some point written handlers explicitly being rebound to the instance using `.bind(this)`.

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

Both approaches work around a particular language aspect of javascript: A method's `this` is depending on the call-site, not the site of definition. I understand how tedious and very alien this seems, especially if you come from a language where `this` always refers to the instance that was being called (Hi Java, and hi `ParentClass.this`). At the same time though, it's a pretty universal concept of the language, one that libraries recommended universal workarounds that were applicable in other libraries as well. My pattern matching worked, no matter if I was doing this in `jQuery` 10 years ago, `knockoutJS` 8 years ago, or `react` 5 years ago.

## *Enterunt react hooks*

React hooks are magic. In a bad way my gut tells me. To cut it short, it effectively is the framework hiding global state from me, and linters enforcing that I don't accidentally mess with it. They're a pleasure to use, but at the same time, they introduce a mechanism that I would've liked to see universally present in a language than specifically bound to a framework.

## How they work

React hooks introduce what I call a "shadow stack" (the official docs call it "memory cells"). Plainly speaking (and probably vastly simplifing it), each call to a function like `useState` is assigned a number, from the first one at the top of the render tree to the last one at the leaves. A call to `useState` will always work on the "memory cell" with that number, and thus provide specific "local" state to a call to a function that does not have state as the language does not provide that.

```js
const MyCounter = ({initialValue}) => {
  const [value, setValue] = useState(initialValue);
  return <div>Count: {value} <button onClick={() => setValue(value+1)}>+</button></div>
}

const App = () => (
  <div>
    <MyCounter initialValue={1}/>
    <MyCounter initialValue={2}/>
)
```

In the old days, you would've written a `class`-Component with `this.state = { value: props.value }` in the constructor, and subsequently updated the state via `this.setState({value: this.state.value+1})`.

With react hooks, each "instance" of `MyCounter` has its own "memory cell", or "stack index", in which it stores `value`.

The concept can be easier explained with a naive implementation:

```js
// Global stack and stackIndex that `useState` can both access
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

const renderApplication = () => {
  // Set stackIndex to 0 to start a fresh render
  stackIndex = 0;

  return `ComponentA: ${MyComponent()}` + "\n" + `ComponentB: ${MyComponent()}`;
};

const MyComponent = () => {
  const [foo, setFoo] = useState(1);
  const [bar, setBar] = useState("A");

  return foo + bar;
};
```

```js
import React, { useState } from "react";

const MyBarComponent = () => {
  const [bar, setBar] = useState("bar?");

  return <div>Bar {bar}</div>;
};

const MyFooComponent = () => {
  const [woop, setWoop] = useState("woop?");
  const barComponent = MyBarComponent();

  return (
    <div>
      {woop} <button onClick={() => setWoop("woop!")}>Set</button>
      {woop == "woop!" && barComponent}
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


SCALA IMPLICITS


# The fauxpax behind cypress

```js
context("Iterating over elements", () => {
  before(() => {
    cy.window().then(window => {
      window.document.write(`
        <ul>
          <li>
            <a href="#1a">1a</a>
            <a href="#1b">1b</a>
          </li>
          <li>
            <a href="#2">2</a>
          </li>
          <li>
            <a href="#3">3</a>
          </li>
        </ul>
        `);
    });
  });

  specify("Iterating the cypress way until you found 2", () => {
    const lis = cy.get("li");
    for (let li of lis) {
      const as = cy.get(li).find("a");
      if (as.length === 1) {
        expect(as[0].innerHTML).to.equal("2");
        return;
      }
    }
    throw new Error("Didn't find the li");
  });

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

  specify("Iterating the promise-y way until you found 2", async () => {
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

![Screenshot showing the first test failing](/assets/on-hooks-cypress-and-other-fauxpas--cypress.png)

##
