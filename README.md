<img src="https://i.imgur.com/he5ACRP.png" width="400" />
___

Glass is an in-browser code editor written in react.

See an in-browser demo at [glass.blvd.space](http://glass.blvd.space).<sup>1</sup>

- **Fast:** Ish.
- **Easy:** A single element. One `<Glass language='js' />` line, and it's done.
- **Small:** Leverages React and prismjs, composing only 400 lines of code.
- **Free:** MIT Licensed.

## Why?

**Glass is not the best in browser code editor out there.**<sup>2</sup> It is best in certain cases, but I wouldn't advise it if you just need a quick in-browser code editor. It is useful if you **already use React,** and need a light in browser code editor.

It does **not** handle:

- **Language detection.**<sup>3</sup>
- **Syntax checking.**

It will just make your code colorful, without a lot of fuss. That's all.

<sup>1: The .space domain was on sale.</sup>  
<sup>2: That's probably [ace](http://ace.c9.io). Codemirror is a single, 9000 line JS file, which lags my browser every time I try to peruse the code.</sup>  
<sup>3: I'm planning on implementing an `underline` prop, which can be passed an array of objects to underline sections of the code. But the syntax checking itself still has to be done by an outside source.</sup>
