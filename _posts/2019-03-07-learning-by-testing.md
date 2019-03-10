---
layout: post
title: "Learning By Testing"
image: "assets/learning-by-testing.jpg"
image_alt: "Architecture sketch with a fine pen on top next to a ruler"
---
In my experience, testing is by far the most powerful, structured method to expand your knowledge about a language and its ecosystem. Not only does it provide you with guidance through the unknowns, it also teaches you to carefully map between requirement and code, and to truly understand the task you're trying to accomplish. In this article, I want to offer you my perspective on mentoring using test-driven development and to provide you with conversation starters for if you choose to try that approach with your mentee.

In the following, I will walk you through a typical mentoring session with a developer. I will show how the conversation you have in the pair is reflected in the evolution of the test-implementation and how the end result is not just a very good test, but also a better understanding of the requirement.

## Slow down to go faster

The first step is to take a lot of time upfront to write the description, something that is crucially important but oftentimes neglected. Just as with commit messages, we're quick to dismiss the description of a test as something not worth investing time in. In both cases, the immediate value isn't obvious – after all we usually have a CI system that will fail if tests not pass, but not when the description is bad – so it requires not just discipline, but also understanding about the value of these "chores" to keep the practice going.

## Context is king

```js
it("should disable the close button", () => {
  // 🤔 When should this happen? Always?
});
```

A test that doesn't provide context will eventually become a burden, as it works on a lot of assumptions that won't be obvious once you need to work with it again.

{% include responsive-image.html image="assets/learning-by-testing-where-does-this-belong-again.png" image_alt="a comic showing a person holding a paper trying to sort it in a huge stack of boxes representing commits." %}

When you write the test, the description is where you make the plan, where you seek alignment between yourself and your pairing partner; What is there to be done? What are the important *moving parts* in this particular scenario? You don't need to be nit-picky, but the description should be close enough to the test code so one isn't stumped about some inconsistency when reading both.

```js
it("should disable the close button whenever it has unsaved changes", () => {
  // 💡 So this is behavior triggered by the fact that it has unsaved changes!
});
```

The more you move away from implementation details and the more you describe the behavior, the better. Of course, as you come to testing the actual implementation, it becomes harder to avoid and also less sensible.

```js
it("should prevent the user from closing if it has unsaved changes", () => {
  // 💡 So the overall idea is that users don't loose their changes!
  // 🤔 Doesn't this test also make the claim that there's only one way to close?
})
```

The moment you're both happy with the description, you not only „wasted“ a lot of time on a single string, you just created a common understanding of the task and probably already have an idea how to approach it 🎉. Even though it might still feel like the least important aspect of a test, your discipline is rewarded with less friction, not just in the pair, but also in the future when others need to work on the code-base (or you yourself, coming back to it after 6 months).

## Enter the three stages of a drama

```js
it("should prevent the user from closing if it has unsaved changes", () => {
  // Given

  // When

  // Then
});
```

To write the actual test code, my favorite approach is still the classic *Given-When-Then* structure, always written as comments in the function body to provide guidance. Depending on how familiar you are with how the code-base works, you can start as small as writing your assumptions in comments below, imagining the code you'd like to write:

```js
it("should prevent the user from closing if it has unsaved changes", () => {
  // Given
  /// There's a form with something written in it that wasn't saved

  // When
  /// The user tries to click the close button

  // Then
  /// Nothing should happen
});
```

In my experience, each step in *Given-When-Then* is harder to formulate than the previous one. Setting up the world is one thing, but understanding which action to simulate, in particular on which abstraction (e.g. choosing between a mouse click, button press or triggering the event handler) can already spark an interesting discussion.

```js
it("should prevent the user from closing if it has unsaved changes", () => {
  // Given
  const onCloseSpy = jest.spy();
  renderForm({ onClose: onCloseSpy });
  fillInComment("this is an unsaved change");

  // When
  clickCloseButton();

  // Then
  expect(onCloseSpy).toNotHaveBeenCalled();
});
```

The *Then*-step eventually is the hardest, as you need to understand how you verify that the world has changed, and in particular how it should have changed. It can be difficult to distinguish first-level effects from cascading effects, so this makes for another interesting discussion. E.g. in our example, is the fact that our `onClose` handler isn't called the right choice? Or should we expect the form to still be there instead? What's the reasonable abstraction to pick here?

## Reality Check

Once you had this discussion, settled for a test and eventually got it to pass, it's time to reflect on the test again (🙋 refactoring!): Do description and implementation still match? Does your interpretation of both still match the requirement? Let's walk through both in an inner monologue to find out:

> - So this is a test for making sure that a user doesn't **accidentally** close the form when they have unsaved changes.  
> - The **only way** to dismiss the form in our application is to click the close button.  
> - Now in the implementation, the test sets up an empty renderForm with a spy on the `onClose` event handler. **Seems like this one is invoked whenever the form should be removed from the DOM.**  
> - The action triggered is a simulated button click on the "close"-button. I'd assume this is a `.find` call on the mounted component and a `.simulate` call to create a fake click event.  
> - Once that happened, the onCloseSpy should not have been called. Makes sense! **I'd trust that the form is still there considering there's no other way to dismiss the form.**

Going through the test line-by-line might reveal that you still need to make changes to either description or implementation. Having it properly reflect what you've been implementing is a necessary chore in order to make sure that the test is still useful a few months down the line, so don't call it a day before going over it!

It requires a lot of patience from both you and your mentee, but I have yet to find a more effective teaching method to foster deeper understanding of a requirement. Additionally, the test will provide such a rapid feedback loop that you'll find yourself stuck far fewer times than when you were testing your changes manually. Whenever you are though, the test will hopefully reveal the culprit much quicker than manual debugging methods. If everything goes well, you not only had a very productive pair programming session, but also guided someone on their path towards more careful and prudent practice.

*I'm providing both coaching on mentoring and mentoring itself to my clients in Berlin, all over Germany and world-wide through remote work. Send me a message via [hello@craftswerk.io](mailto:hello@craftswerk.io) if you're interested in me improving the engineering and collaboration culture of your team!*
