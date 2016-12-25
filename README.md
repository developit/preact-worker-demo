# Demo: Preact rendering entirely inside a Web Worker

[![gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/developit/preact)

> :guitar: Demonstrates [Preact] rendering entirely within a Web Worker.
>
> :rocket: This means your UI stays interactive at 60FPS, even if your application grinds to a halt in the background.
>
> **[:boom: View Demo :boom:](https://preact-worker-demo.surge.sh)**


---


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
