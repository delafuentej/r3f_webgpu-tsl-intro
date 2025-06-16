import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  uv,
  uniform,
  color,
  step,
  mod,
  add,
  mul,
  mix,
  floor,
  vec3,
  vec4,
  length,
  smoothstep,
  time,
  Fn,
} from "three/tsl";

export const CheckeredNodeMaterial = ({
  colorA = "#ffffff", // Blanco
  colorB = "#111111", // Negro
  blinkSpeed = 5,
  scale = 8, // número de cuadros (más alto = más pequeños)
  emissiveColor = "gold",
}) => {
  const { nodes, uniforms } = useMemo(() => {
    const uniforms = {
      colorA: uniform(color(colorA)),
      colorB: uniform(color(colorB)),
      blinkSpeed: uniform(blinkSpeed),
      scale: uniform(scale),
      emissiveColor: uniform(color(emissiveColor)),
    };

    const blink = Fn(([t, speed]) => {
      const blinkValue = t.mul(speed).sin().mul(0.5).add(0.5).toVar();
      //   If(uv().x.greaterThan(0.5), () => {
      //     blinkValue.assign(t.mul(speed).cos().mul(0.5).add(0.5));
      //   });

      return blinkValue;
    });

    let uvCentered = uv().sub(0.5).mul(2.0); // Center UV at (0,0)
    let radialDist = length(uvCentered); // Distance from center
    let edgeGlow = smoothstep(0.8, 1, radialDist); // Adjust thresholds for glow width

    // Escala el UV para repetir el patrón
    const scaledUV = uv().mul(uniforms.scale);

    // Usa `floor` y `mod` para crear patrón a cuadros
    const checker = mod(floor(scaledUV.x).add(floor(scaledUV.y)), 2.0); // 0 o 1

    // Interpola entre colorA y colorB según el patrón
    const finalColor = mix(uniforms.colorA, uniforms.colorB, checker).mul(
      blink(time, uniforms.blinkSpeed)
    );

    return {
      nodes: {
        colorNode: finalColor,
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
    uniforms.scale.value = scale;
    uniforms.emissiveColor.value.set(emissiveColor);
  });

  return <meshStandardNodeMaterial {...nodes} />;
};
