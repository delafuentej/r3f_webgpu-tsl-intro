import React, { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  color,
  mix,
  texture,
  uniform,
  mx_noise_float,
  positionWorld,
  step,
  remap,
  negate,
  vec4,
} from "three/tsl";
import { lerp } from "three/src/math/MathUtils.js";

const DissolveMaterial = ({
  visible = true,
  size = 12,
  thickness = 0.1,
  dissolveColor = "orange",
  intensity = 2,
  ...props
}) => {
  console.log("props", props);
  const { nodes, uniforms } = useMemo(() => {
    const uniforms = {
      progress: uniform(0),
      size: uniform(size),
      thickness: uniform(thickness),
      borderColor: uniform(color(dissolveColor)),
      intensity: uniform(intensity),
    };
    const smoothProgress = uniforms.progress.remap(
      0,
      1,
      negate(uniforms.thickness),
      1
    );
    const noise = mx_noise_float(positionWorld.mul(uniforms.size));
    //const alpha = step(noise, uniforms.progress);//Our noise texture is now applied when fading out, but it stops halfway leaving the model half-dissolved. 🧀
    //This is because the noise value is between -1 and 1. Let's remap it to be between 0 and 1 using the remap node:
    const dissolve = remap(noise, -1, 1, 0, 1);
    // const alpha = step(dissolve, uniforms.progress);
    const alpha = step(dissolve, smoothProgress);
    /*const border = step(
      dissolve,
      uniforms.progress.add(uniforms.thickness)
    ).sub(alpha);*/

    const border = step(dissolve, smoothProgress.add(uniforms.thickness)).sub(
      alpha
    );
    const borderColor = uniforms.borderColor.mul(uniforms.intensity);

    const baseColor = texture(props.map);
    const finalColor = mix(baseColor, borderColor, border);

    const shadowColor = mix(color("white"), color("black"), alpha);

    return {
      uniforms,
      nodes: {
        colorNode: finalColor,
        opacityNode: alpha.add(border),
        emissiveNode: borderColor.mul(border),
        castShadowNode: vec4(shadowColor, 1.0),
      },
    };
  }, []);
  useFrame((_, delta) => {
    uniforms.progress.value = lerp(
      uniforms.progress.value,
      visible ? 1 : 0,
      delta * 2
    );
    uniforms.size.value = size;
    uniforms.thickness.value = thickness;
    uniforms.intensity.value = intensity;
    uniforms.borderColor.value.set(dissolveColor);
  });
  return (
    <meshStandardNodeMaterial
      {...props}
      {...nodes}
      transparent
      toneMapped={false}
    />
  );
};

export default DissolveMaterial;
