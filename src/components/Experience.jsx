import {
  Environment,
  OrbitControls,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { extend } from "@react-three/fiber";
import { useControls } from "leva";
import { PracticeNodeMaterial } from "./materials/PracticeNodeMaterial";
import Racer from "./Racer";
import RacingCar from "./RacingCar";
import { CheckeredNodeMaterial } from "./materials/CheckeredNodeMaterial";

export const Experience = () => {
  const materialProps = useControls(
    "Background Circle",
    {
      // colorA: { value: "#000000" },
      // colorB: { value: "#942132" },
      // emissiveColor: { value: "orange" },
      blinkSpeed: { value: 1, min: 0, max: 10 },
      scalingFactor: { value: 5, min: 1, max: 10 },
      movementSpeed: { value: 0.5, min: -5, max: 5, step: 0.01 },
    },
    { collapsed: true }
  );
  return (
    <>
      <directionalLight position={[5, 5, -5]} intensity={0.5} castShadow />
      <Environment preset="sunset" environmentIntensity={0.5} />
      <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} />
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardNodeMaterial color="pink" />
      </mesh> */}
      <mesh rotation-x={-Math.PI / 2} visible={false}>
        <planeGeometry args={[2, 2, 200, 200]} />
        <PracticeNodeMaterial {...materialProps} />
      </mesh>
      <RacingCar />
      <Racer />
      {/* circle background */}
      <mesh position={[0, 1, -6]}>
        <circleGeometry args={[2, 200]} />
        <CheckeredNodeMaterial
          colorA="#ffffff"
          colorB="#000000"
          scale={18}
          blinkSpeed={0.5}
        />
        {/* <PracticeNodeMaterial {...materialProps} /> */}
      </mesh>
      {/* Floor */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        {/* <MeshReflectorMaterial
          color="#171720"
          resolution={1024}
          roughness={0.6}
          mixStrength={3}
        /> */}
        <meshStandardNodeMaterial color="#1d1d1d" roughness={0.9} />
      </mesh>
    </>
  );
};

extend({
  MeshStandardNodeMaterial,
});
