"use client";

import { useRef, useState } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas, type ThreeElements, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { type Mesh, Vector3 } from "three";

export const Cube = (props: ThreeElements["mesh"] & { color: string; hoverColor: string; scaleSpeed: number }) => {
  const ref = useRef<Mesh>(null);

  const [hovered, hover] = useState(false);

  const targetScaleRef = useRef(1);

  useFrame(() => {
    if (!ref.current) return;

    const targetScale = hovered ? 0.8 : 1;
    targetScaleRef.current = targetScale;

    const currentScale = ref.current.scale;
    const newScale = new Vector3(targetScale, targetScale, targetScale);
    currentScale.lerp(newScale, props.scaleSpeed);
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={(event: React.PointerEvent) => (event.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? props.hoverColor : props.color} />
    </mesh>
  );
};

export const Cubes = () => {
  const { color, hoverColor, scaleSpeed, noOfRows, noOfColumns } = useControls("Cube", {
    scaleSpeed: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    color: "#ff9900",
    hoverColor: "#00ff99",
    noOfRows: { value: 3, min: 1, max: 15, step: 1 },
    noOfColumns: { value: 3, min: 1, max: 15, step: 1 },
  });

  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {Array.from({ length: noOfRows }).map((_, rowIndex) =>
        Array.from({ length: noOfColumns }).map((_, colIndex) => (
          <Cube
            key={`${rowIndex}-${colIndex}`}
            position={[rowIndex - noOfRows / 2 + rowIndex * 0.1, colIndex - noOfColumns / 2 + colIndex * 0.1, 0]}
            color={color}
            hoverColor={hoverColor}
            scaleSpeed={scaleSpeed}
          />
        ))
      )}
      <OrbitControls />
    </Canvas>
  );
};
