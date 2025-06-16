import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { Suspense, useState } from "react";
import { useControls } from "leva";
import { Experience } from "./components/Experience";
import { PostProcessing } from "./components/PostProcessing";

function App() {
  const ppSettings = useControls(
    "Post Processing",
    {
      strength: {
        value: 0.8,
        min: 0,
        max: 10,
        step: 0.1,
      },
      radius: {
        value: 0.42,
        min: 0,
        max: 10,
        step: 0.1,
      },
      threshold: {
        value: 0.75,
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    { collapsed: true }
  );
  const [frameloop, setFrameloop] = useState("never");
  return (
    <>
      <Stats />
      <Canvas
        frameloop={frameloop}
        shadows
        camera={{ position: [0, 2, 8], fov: 30 }}
        // we create a new WebGPURenderer instance and  pass the canvas element to it
        gl={(canvas) => {
          const renderer = new THREE.WebGPURenderer({
            canvas,
            powerPreference: "high-performance",
            antialias: true,
            alpha: false,
            stencil: false,
            shadowMap: true,
          });
          renderer.init().then(() => {
            console.log("WebGPU?", !!renderer.backend.isWebGPUBackend);
            setFrameloop("always");
          });
          return renderer;
        }}
      >
        <color attach="background" args={["#262626"]} />
        <fog attach="fog" args={["#262626", 20, 30]} />
        <Suspense>
          <group position-y={-1}>
            <Experience />
          </group>
        </Suspense>
        <PostProcessing {...ppSettings} />
      </Canvas>
    </>
  );
}
export default App;
