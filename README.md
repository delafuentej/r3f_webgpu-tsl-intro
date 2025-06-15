# F1 Ferrari Racing Driver Winner - 3D Scene

This project showcases a 3D scene of a winning Ferrari F1 racing driver created using React Three Fiber, leveraging the latest WebGPU renderer and Three Shading Language (TSL). It is built with Vite and features advanced post-processing effects.

## 📸 Preview

![App Preview](public/gif/ferrari.gif)

## 🌍 Live Demo

[Click here to view the app online](https://r3f-webgpu-tsl-intro.vercel.app/)

## Features

- Custom materials using Three Shading Language (TSL)
- WebGPU renderer integration with WebGL fallback for broad compatibility
- Post-processing effects to enhance visual quality
- React Three Fiber (R3F) for declarative 3D scene construction
- Interactive controls and performance optimizations

## Conclusion

- How to customize materials using TSL, how to use the new WebGPU renderer, and how to add post-processing effects.

**Be careful, the WebGPU API but also Three.js implementation of it are not in their final form yet. Some features may change in the future and lead to breaking changes.**

**While we have seen React Three Fiber is compatible with WebGPU, not all Drei components are ported yet. Actually, all the ones relying on custom shaders. The most notable one is the Html component.**

As it's always evolving, I highly recommend you to check:

- [Three.js Shading Language Wiki](https://github.com/mrdoob/three.js/wiki/Three.Shading.Language) – The central documentation for TSL.
- [Three.js WebGPU Examples](https://threejs.org/examples/?q=webgpu#webgpu_materials) – Examples showing WebGPU and TSL usage.
- [Three.js Release Notes](https://github.com/mrdoob/three.js/releases) – Important updates and deprecations.
- [Three.js Source Code](https://github.com/mrdoob/three.js) – Explore the internals of components.
- [Three.js Discourse](https://discourse.threejs.org/) – Official forum with discussions on WebGPU and TSL.
- [Three.js Issues](https://github.com/mrdoob/three.js/issues) – Track and report bugs related to WebGPU and TSL.

## Technologies Used

This project was built using the following technologies and libraries:

- **React** ^18.3.1
- **React DOM** ^18.3.1
- **Vite** ^6.2.0 (build tool and development server)
- **@vitejs/plugin-react** ^4.3.4 (React plugin for Vite)
- **Three.js** ^0.174.0 (3D rendering library)
- **React Three Fiber** ^8.17.12 (React renderer for Three.js)
- **@react-three/drei** ^9.121.3 (useful helpers and abstractions for React Three Fiber)
- **Tailwind CSS** ^4.0.9 (utility-first CSS framework)
- **@tailwindcss/vite** ^4.0.9 (Tailwind plugin for Vite)
- **Leva** ^0.10.0 (React stateful GUI for tweaking parameters)
- **TypeScript Types for React and React DOM** (^18.3.3 and ^18.3.0 respectively)
- **Globals** ^15.15.0 (library to define global variables)

# Getting Started

1. Clone the repository.

```bash
git clone https://github.com/delafuentej/r3f_webgpu-tsl-intro.git
cd r3f_webgpu-tsl-intro

```

2. Install dependencies.

```bash
yarn install

```

1. Run the development server.

```bash
yarn dev

```
