/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import DissolveMaterial from "./materials/DissolveMaterial";

function Racer(props) {
  const dissolveMaterialProps = useControls(
    "Dissolve Effect",
    {
      visible: { value: true },
      size: { value: 12, min: 0, max: 20 },
      thickness: { value: 0.1, min: 0, max: 1 },
      dissolveColor: { value: "orange" },
      intensity: { value: 2, min: 0, max: 10 },
    },
    { collapsed: true }
  );
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/racer-opt.glb");
  const { actions } = useAnimations(animations, group);
  console.log("actions", actions);

  const { visible } = useControls({
    visible: { value: true },
  });

  useEffect(() => {
    actions?.["Armature|mixamo.com|Layer0"]?.play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          position={[0, 0, -1.5]}
        >
          <primitive object={nodes.mixamorig6Hips} />
        </group>
        <skinnedMesh
          name="Ch20"
          geometry={nodes.Ch20.geometry}
          //  material={materials.Ch20_body}
          skeleton={nodes.Ch20.skeleton}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          castShadow
          receiveShadow
          //castShadow={visible ? true : false}
          //receiveShadow={visible ? true : false}
        >
          <DissolveMaterial
            {...materials.Ch20_body}
            {...dissolveMaterialProps}
            visible={visible}
          />
        </skinnedMesh>
      </group>
    </group>
  );
}

export default Racer;

useGLTF.preload("/models/racer-opt.glb");
