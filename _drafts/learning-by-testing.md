---
layout: post
title: "Learning By Testing"
image: "assets/learning-by-testing.jpg"
image_alt: "Architecture sketch with a fine pen on top next to a ruler"
---
Taking the time to write good tests has helped me tremendously demystify every codebase I had to work with so far. As you tackle an unknown from both sides, what you think the world looks like now and also after something happened, you also learn to translate requirements into code, and vis versa. I found this equally useful when mentoring, as it invites you to think more about the reasons you have to write code in the first place.

Once you move past learning the syntax, a language finally becomes a powerful tool to wield. From here, a vast array of knowledge only waits to be discovered, like frameworks, paradigms or design patterns. The most powerful, structured method to expand your knowledge about a language and its ecosystem at this point is testing. Not only does it provide you with guidance through the unknowns, it also teaches you to carefully map between requirement and code, and to truly understand the task you're trying to accomplish.

My dear reader, I imagine that by now, you're familiar with my obsession for feedback loops. Whenever tasked with something where I find myself not knowing either requirements or the code-base too well, the question "How do I know if I'm going into the right direction" helps me find out where I need to dive in deeper, the requirement or the code. As my current roles involve coaching developers a lot, I found this question to be a good starting point in mentoring situations, where the mentee's next learning angle is to move away from hacking to proper software engineering.

As many others, I learned programming by playing around and hacking to just get the computer to do what I wanted to achieve. PHP, being my first programming language, was incredible for just that, but it also meant that my first projects were crude snippet collections that only accidentally aligned in a way that seemed to be working.

<TODO>Totally wrong, `onSave` and all </TODO>
{% include responsive-image.html image="assets/learning-by-testing-test-annotated.png" image_alt="An annotated test in JavaScript" %}

The engineers I mentor today are well past that point, but still sometimes find themselves taking too little care to understand the problem first. Applying test-driven-development in this situation means you need to take a break and lay out your assumptions first. Apart from helping us both stay aligned when pairing, it also helps moving their practices away from hackery towards a more structured practice.

It requires practice though. Just as commit messages, we're quick to dismiss the description of a test as something worth investing time in.

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

The moment you're both happy with the description, you not only spend a lot of time on a string, you created a common understanding of the task and already have an idea how to approach it 🎉. A common reflex to unlearn is to rush through making a proper description. Just as a commit message, it feels like the least important piece to spend time on when coding. But the discipline is rewarded with less friction, in the pair, but also in the future when others need to work on the code-base (or you yourself, coming back to it after 6 months).

```js
it("should prevent the user from closing if it has unsaved changes", () => {
  // Given

  // When

  // Then
});
```

To write the actual test code, the best approach I've found so far is still the classic *Given-When-Then* structure, written as comments in the function body. Depending on how far we can start as small as writing our assumptions in comments below, explaining the code we'd like to write:

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
