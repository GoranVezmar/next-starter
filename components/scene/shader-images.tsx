"use client";

import { useEffect, useRef } from "react";

import { lerp } from "@/utils";
import { Text } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Mesh, ShaderMaterial, TextureLoader, Vector2 } from "three";

const vertexShader = `
    uniform vec2 uOffset;
    varying vec2 vUv;

    vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
      float M_PI = 3.1415926535897932384626433832795;
      position.x = position.x + (sin(uv.y * M_PI) * offset.x);
      position.y = position.y + (sin(uv.x * M_PI) * offset.y);
      return position;
    }

    void main() {
      vUv = uv + (uOffset * 2.0);
      vec3 newPosition = position;
      newPosition = deformationCurve(position, uv, uOffset);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uAlpha;
  varying vec2 vUv;

  vec2 scaleUV(vec2 uv, float scale) {
    float center = 0.5;
    return ((uv - center) * scale) + center;
  }

  void main() {
    vec3 color = texture2D(uTexture, scaleUV(vUv, 0.8)).rgb;
    gl_FragColor = vec4(color, uAlpha);
  }
`;

export const ShaderImage = () => {
  const texture = useLoader(TextureLoader, "/door.jpg");
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const hoveredRef = useRef(false);
  const mousePositionRef = useRef({
    current: { x: 0, y: 0 },
    previous: { x: 0, y: 0 },
  });

  useFrame(() => {
    if (materialRef.current && meshRef.current) {
      const currentAlpha = materialRef.current.uniforms.uAlpha.value;
      const targetAlpha = hoveredRef.current ? 1 : 0;
      const lerpIntensity = hoveredRef.current ? 0.03 : 0.1;

      materialRef.current.uniforms.uAlpha.value = lerp(currentAlpha, targetAlpha, lerpIntensity);

      const lerpedX = lerp(mousePositionRef.current.previous.x, mousePositionRef.current.current.x, 0.05);
      const lerpedY = lerp(mousePositionRef.current.previous.y, mousePositionRef.current.current.y, 0.05);

      const dx = (mousePositionRef.current.current.x - lerpedX) * 0.0002;
      const dy = (mousePositionRef.current.current.y - lerpedY) * 0.0002;

      mousePositionRef.current.previous.x = lerpedX;
      mousePositionRef.current.previous.y = lerpedY;

      materialRef.current.uniforms.uOffset.value.x = Math.sin(dx);
      materialRef.current.uniforms.uOffset.value.y = Math.sin(dy);

      meshRef.current.position.x = (lerpedX / window.innerWidth) * 2 - 1;
      meshRef.current.position.z = (lerpedY / window.innerHeight) * 2 - 1;
    }
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = {
        ...mousePositionRef.current,
        current: { x: event.clientX, y: event.clientY },
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        fontSize={0.3}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerEnter={() => (hoveredRef.current = true)}
        onPointerLeave={() => (hoveredRef.current = false)}
      >
        Hover me
      </Text>
      <mesh ref={meshRef} position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
        <planeGeometry args={[0.8, 1.2, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={{
            uOffset: { value: new Vector2(0.0, 0.0) },
            uTexture: { value: texture },
            uAlpha: { value: 0.0 },
          }}
          wireframe={false}
          transparent={true}
        />
      </mesh>
    </>
  );
};

export const ShaderImages = () => {
  return (
    <Canvas camera={{ position: [0, 2.0, 0] }}>
      <ShaderImage />
    </Canvas>
  );
};
