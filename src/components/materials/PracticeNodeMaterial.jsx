// create custom nodes to personalize our materials with TSL

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  color,
  mix,
  uv,
  uniform,
  positionLocal,
  vec3,
  vec4,
  hash,
  vertexIndex,
  mul,
  Fn,
  time,
  If,
  max,
  mx_noise_vec3,
  length,
  smoothstep,
} from "three/tsl";

import { randFloat } from "three/src/math/MathUtils.js";
// export const PracticeNodeMaterial = ({
//   colorA = "white",
//   colorB = "orange",
// }) => {
//   return <meshStandardNodeMaterial color={colorB} />;
// };

export const PracticeNodeMaterial = ({
  colorA = "white",
  colorB = "orange",
  blinkSpeed = 1,
  scalingFactor = 3,
  movementSpeed = 0.5,
  emissiveColor = "orange",
}) => {
  const { nodes, uniforms } = useMemo(() => {
    const uniforms = {
      colorA: uniform(color(colorA)),
      colorB: uniform(color(colorB)),
      blinkSpeed: uniform(blinkSpeed),
      scalingFactor: uniform(scalingFactor),
      //
      movementSpeed: uniform(movementSpeed),
      emissiveColor: uniform(color(emissiveColor)),
    };

    // using the sin() method return a value between 0 & 1
    const blink = Fn(([t, speed]) => {
      const blinkValue = t.mul(speed).sin().mul(0.5).add(0.5).toVar();
      //   If(uv().x.greaterThan(0.5), () => {
      //     blinkValue.assign(t.mul(speed).cos().mul(0.5).add(0.5));
      //   });

      return blinkValue;
    });

    //circle bg
    let uvCentered = uv().sub(0.5).mul(2.0); // Center UV at (0,0)
    let radialDist = length(uvCentered); // Distance from center
    let edgeGlow = smoothstep(0.8, 1, radialDist); // Adjust thresholds for glow width

    //const randHeight = hash(vertexIndex); //randFloat(0, 1);
    // mul => to reduce the effect by multiplying the randHeight by a value
    const randHeight = mx_noise_vec3(
      // We add the time to the uv coordinates to make the noise move over time.
      uv().mul(uniforms.scalingFactor).add(time.mul(uniforms.movementSpeed))
    ).x;
    const offset = randHeight.mul(0.3);

    //We can also adjust the color to be based on the height and not the UV coordinates.
    //We can use the mix node to mix the two colors based on the height of the vertex.
    const finalPosition = positionLocal.add(vec3(0, 0, offset));

    const finalColor = mix(uniforms.colorA, uniforms.colorB, randHeight).mul(
      max(0.15, blink(time, uniforms.blinkSpeed))
    );
    return {
      nodes: {
        colorNode: finalColor,
        positionNode: finalPosition,
        emissiveNode: vec4(
          mix(finalColor, uniforms.emissiveColor.mul(2), edgeGlow),
          edgeGlow
        ),
      },
      uniforms,
    };
  }, []);

  useFrame(() => {
    uniforms.colorA.value.set(colorA);
    uniforms.colorB.value.set(colorB);
    uniforms.blinkSpeed.value = blinkSpeed;
    uniforms.scalingFactor.value = scalingFactor;
    uniforms.movementSpeed.value = movementSpeed;
    uniforms.emissiveColor.value.set(emissiveColor);
  });
  return <meshStandardNodeMaterial {...nodes} />;
};

/*export const PracticeNodeMaterial = ({
    colorA = "white",
    colorB = "orange",
  }) => {
    return (
      <meshStandardNodeMaterial
        colorNode={mix(color(colorA), color(colorB), uv())}
      />
    );
  };*/
