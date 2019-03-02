---
layout: post
title: "Learning By Testing"
image: "assets/learning-by-testing.jpg"
image_alt: "Architecture sketch with a fine pen on top next to a ruler"
---
Taking the time to write good tests has helped me tremendously demystify every codebase I had to work with so far. As you tackle an unknown from both sides – what you think the world looks like now and also after something happened – you also learn to translate requirements into code, and vis versa. This approach is most useful when mentoring, as it invites both of you to think more about the reasons why you have to write code in the first place.

Once you move past learning the syntax, a language finally becomes a powerful tool to wield. From here, a vast array of knowledge only waits to be discovered, like frameworks, paradigms or design patterns. The most powerful, structured method to expand your knowledge about a language and its ecosystem at this point is testing. Not only does it provide you with guidance through the unknowns, it also teaches you to carefully map between requirement and code, and to truly understand the task you're trying to accomplish.

If you happened to read my previous articles, I assume you're familiar with my obsession for feedback loops. Whenever I find myself not knowing either requirements or the code-base too well, I will put processes in place that help me answer the question: "How do I know if I'm going into the right direction".
That feedback loop helps me uncover disparities between requirements and code, and approach the right people with something to explain myself further.

As my current roles involve coaching developers a lot, I found this question and the feedback loop of tests to be a good starting point in mentoring situations, where the mentee's next learning angle is to move away from hacking to proper software engineering.

As many others, I learned programming by playing around and hacking to just get the computer to do what I wanted to achieve. PHP, being my first programming language, was incredible for just that, but it also meant that my first projects were crude snippet collections that only accidentally aligned in a way that seemed to be working.

The engineers I mentor today are well past that point, but it still happens that too little care is taken by them to understand the problem first. Applying test-driven-development in this situation means you need to take a break and lay out your assumptions first. Apart from helping us both stay aligned when pairing, it also helps moving their practices away from hackery towards a more structured practice.

It requires practice though. Just as with commit messages, we're quick to dismiss the description of a test as something not worth investing time in. In both cases, the immediate value isn’t obvious – after all we usually have a CI system that will fail if tests not pass, but not when the description is bad – so it requires not just discipline, but also some understanding about the value of these exercises to keep the practice going.

```js
it("should disable the close button", () => {
  // 🤔 When should this happen? Always?
});
```

A test that doesn't provide context will eventually become a burden, as it works on a lot of assumptions that won't be obvious once you need to work with it again.

When you write the test, the description is where you make the plan, where you seek alignment between yourself and your pairing partner; what is there to be done? what are the important *moving parts* in this particular scenario? You don't need to be nit-picky, but the description should be close enough to the test code so one isn't stumped about some inconsistency when reading both.

```js
it("should disable the close button whenever it has unsaved changes", () => {
  // 💡 So this is behavior triggered by the fact that it has unsaved changes!
});
```

The more you move away from implementation details and the more you describe the behavior, the better (of course, as you come to testing the actual implementation, it becomes harder to avoid and also less sensible).

```js
it("should prevent the user from closing if it has unsaved changes", () => {
  // 💡 So the overall idea is that users don't loose their changes!
  // 🤔 Doesn't this test also make the claim that there's only one way to close?
})
```

The moment you're both happy with the description, you not only „wasted“ a lot of time on a single string, you just created a common understanding of the task and probably already have an idea how to approach it 🎉. Even though it might still feel like the least important aspect of a test, your discipline is rewarded with less friction, not just in the pair, but also in the future when others need to work on the code-base (or you yourself, coming back to it after 6 months).

```js
it("should prevent the user from closing if it has unsaved changes", () => {
  // Given

  // When

  // Then
});
```

To write the actual test code, my favorite approach is still the classic *Given-When-Then* structure, always written as comments in the function body to provide guidance. Depending on how familiar we are with how the code-base works, we can start as small as writing our assumptions in comments below, imagining the code we'd like to write:

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
