
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { GalaxyData } from '../constants';

interface GalaxyProps {
  data: GalaxyData;
}

export const Galaxy: React.FC<GalaxyProps> = ({ data }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { params } = data;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(params.count * 3);
    const colors = new Float32Array(params.count * 3);
    const colorInside = new THREE.Color(params.colorIn);
    const colorOutside = new THREE.Color(params.colorOut);

    for (let i = 0; i < params.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * params.radius;
      const spinAngle = radius * params.spin;
      const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * radius;
      const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * radius;
      const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / params.radius);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return [positions, colors];
  }, [params]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef} position={new THREE.Vector3(...data.position)}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={params.count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={params.count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={params.size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
};
