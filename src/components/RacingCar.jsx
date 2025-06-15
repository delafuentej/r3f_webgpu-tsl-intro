import { Gltf } from "@react-three/drei";

import React from "react";

const RacingCar = () => {
  return (
    <Gltf
      src="/models/f1_2004_racing_car.glb"
      position={[0, 0.44, -4]}
      scale={0.5}
      rotation-y={Math.PI / 4}
      castShadow
    />
  );
};

export default RacingCar;
