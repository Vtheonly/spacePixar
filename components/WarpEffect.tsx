
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export const WarpEffect: React.FC<{ active: boolean }> = ({ active }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const { camera } = useThree();

  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      velocities[i] = 10 + Math.random() * 20;
    }
    return { positions, velocities };
  }, []);

  useFrame((_, delta) => {
    if (!active || !pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particles.velocities.length; i++) {
        const i3 = i * 3;
        positions[i3 + 2] += particles.velocities[i] * delta * 5; // Move towards camera

        if (positions[i3 + 2] > 5) { // Reset particle when it passes the camera
            positions[i3 + 2] = -50 - Math.random() * 50;
        }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.position.copy(camera.position);
    pointsRef.current.rotation.copy(camera.rotation);

  });

  if (!active) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#87ceeb"
        size={0.05}
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
};
