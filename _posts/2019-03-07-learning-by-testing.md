---
layout: post
title: "Learning By Testing"
image: "assets/learning-by-testing.jpg"
image_alt: "Architecture sketch with a fine pen on top next to a ruler"
---
Taking the time to write good tests first has helped me tremendously demystify every codebase I had to work with. As you tackle an unknown from both sides – what you think the world looks like before, and also after something happened – you also learn to translate requirements into code, and vis versa. I found this approach most useful when mentoring, as it invites both of you to deliberately think more about the reasons why you have to write code in the first place and how to verify you're doing the right thing. Read on to find out how such a mentoring session with me looks like.

Once you move past learning the syntax, a language becomes a powerful tool to wield. From here, a vast array of knowledge only waits to be discovered, like frameworks, paradigms or design patterns. In my experience, testing is by far the most powerful, structured method to expand your knowledge about a language and its ecosystem. Not only does it provide you with guidance through the unknowns, it also teaches you to carefully map between requirement and code, and to truly understand the task you're trying to accomplish.

This article is meant to offer my perspective on mentoring using test-driven development and to provide you with conversation starters for if you choose to try that approach with your mentee.

{% include responsive-image.html image="assets/learning-by-testing-feedback-loops.png" image_alt="Feedback loops when coding, TDD fastest, Stakeholder Feedback slowest" %}

If you happened to read my previous articles, I assume you're familiar with my obsession for short feedback loops. Whenever I find myself not knowing either requirements or the code-base too well, I will put processes in place that help me answer the question: "How do I know if I'm going into the right direction".
That feedback loop helps me uncover disparities between requirements and code, and approach the right people with something to explain myself further.

As my current roles involve coaching developers a lot, I found that question and the feedback loop of tests to be very helpful whenever our goal is to not just expand their technical skills, but also to further develop the discipline to take the time to reflect and to take more care in their practice.

As many others, I learned programming by playing around and hacking to just get the computer to do what I wanted to achieve. PHP, being my first programming language, was incredible for just that, but it also meant that my first projects were crude snippet collections that only accidentally aligned in a way that seemed to be working. Mind that I’m praising PHP for what it has been for me, an approachable tool to learn programming — it has come a long way since then and I’m still fond of it.

The engineers I mentor today are well past that point. But no matter at what point in your career you are, the pressure of deadlines and wrongful expectations to be "a quick problem-solver" can still capture you and make you fall back into tunnel vision. Applying test-driven-development in this situation forces us to take a break and lay out our assumptions first. Apart from helping us both stay aligned when pairing, it also helps moving their practices away from get-sh*t-done-hackery towards a more structured practice.

It requires practice though. Just as with commit messages, we're quick to dismiss the description of a test as something not worth investing time in. In both cases, the immediate value isn't obvious – after all we usually have a CI system that will fail if tests not pass, but not when the description is bad – so it requires not just discipline, but also understanding about the value of these exercises to keep the practice going.

## Context is king

```js
it("should disable the close button", () => {
  // 🤔 When should this happen? Always?
});
```

A test that doesn't provide context will eventually become a burden, as it works on a lot of assumptions that won't be obvious once you need to work with it again.

{% include responsive-image.html image="assets/learning-by-testing-where-does-this-belong-again.png" image_alt="a comic showing a person holding a paper trying to sort it in a huge stack of boxes representing commits." %}

When you write the test, the description is where you make the plan, where you seek alignment between yourself and your pairing partner; what is there to be done? what are the important *moving parts* in this particular scenario? You don't need to be nit-picky, but the description should be close enough to the test code so one isn't stumped about some inconsistency when reading both.

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

It requires a lot of patience from both you and your mentee, but I have yet to find a more effective teaching method to foster deeper understanding of a requirement. Additionally, the test will provide such a rapid feedback loop that you'll find yourself stuck far fewer times than when you were testing your changes manually. Whenever you are though, the test will hopefully reveal the culprit much quicker than manual debugging methods. If everything goes well, you not only had a very productive pair programming session, but also guided someone on their path towards more awareness and disciplined practice.

*I'm providing both coaching on mentoring and mentoring itself to my clients in Berlin, all over Germany and world-wide through remote work. Send me a message via [hello@craftswerk.io](mailto:hello@craftswerk.io) if you're interested in me improving the engineering and collaboration culture of your team!*
