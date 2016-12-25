# A full [Preact] app rendering in a Web Worker [![gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/developit/preact)

<a href="https://preact-worker-demo.surge.sh"><img src="http://i.imgur.com/7v881hw.gif" width="204" align="right"></a>

Have you ever wondered if you could take advantage of Web Workers to render a Virtual DOM app in a background thread? This repo contains the source code of a [demo messaging app](https://preact-worker-demo.surge.sh) that does just that! 🌈

> ⚡️ A complete [Preact] app running _entirely_ within a Web Worker.
>
> 💁 For a high level overview of the approach, see [How It Works](#how-it-works).
>
> 🚀 This means your UI stays interactive at 60FPS, even if your application grinds to a halt in the background.
>
> ### **[💥 View Demo 💥](https://preact-worker-demo.surge.sh)**


---


# How It Works

The implementation is split into [renderer/dom.js](https://github.com/developit/preact-worker-demo/blob/master/src/renderer/dom.js) and [renderer/worker.js](https://github.com/developit/preact-worker-demo/blob/master/src/renderer/worker.js).  These modules live outside and inside the Worker (respectively), and communicate with eachother asynchronously via `postMessage()`.

The app's code, components, libraries and DOM are all isolated in a single Worker (background thread).  This means even [Preact]'s diff algorithm and component instantiation is done in the worker.  The main (UI) thread simply applies a stream of serialized DOM change descriptions ([MutationRecords]), and proxies events back to the Worker to be handled off the main thread.

As an optimization, when serializing DOM Elements to be published up to the UI thread, any previously-sent Elements are replaced with IDs. These are correlated through a mapping retained on both sides of the thread boundary.


# Quick-Start Guide

- [Installation](#installation)
- [Development Workflow](#development-workflow)


## Installation

**1. Clone this repo:**

```sh
git clone --depth 1 https://github.com/developit/preact-worker-demo.git
cd preact-worker-demo
```


**2. Install the dependencies:**

```sh
npm install
```

> You're done installing! Now let's get started developing.



## Development Workflow


**3. Start a live-reload development server:**

```sh
PORT=8080 npm run dev
```


**4. Generate a production build in `./build`:**

```sh
npm run build
```

> You can now deploy the contents of the `build` directory to production!
>
> **[Surge.sh](https://surge.sh) Example:** `surge ./build -d my-app.surge.sh`


**5. Start local production server with `superstatic`:**

```sh
npm start
```

> This is to simulate a production (CDN) server with gzip. It just serves up the contents of `./build`.


---


## License

MIT


[Preact]: https://developit.github.io/preact
[MutationRecords]: https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
