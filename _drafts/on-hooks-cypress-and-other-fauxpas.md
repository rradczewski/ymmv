---
layout: post
title: "On Hooks, Cypress and other fauxpas"
---

# The fauxpax behind hooks

duh

+ reference to scala implicits

A naive hooks implementation

```js
const stack = [];
let stackIndex = -1;


const useState = (initialValue) => {
    if(!stack[stackIndex]) 
        stack[stackIndex] = initialValue;

    let i = stackIndex++;
    const value = stack[i];
    const setter = (val) => (stack[i] = val);
    return [value, setter];
}

const renderApplication = () => {
    stackIndex = 0;

    return `
        ComponentA: ${MyComponent()}
        ComponentB: ${MyComponent()}
    `;
}

const MyComponent = () => {
    const [foo, setFoo] = useState(1);
    const [bar, setBar] = useState("A");

    return foo+bar;
}

```

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