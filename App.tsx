
import React, { useState, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { GALAXY_DATA, GalaxyData } from './constants';
import { Galaxy } from './components/Galaxy';
import { GalaxyList } from './components/GalaxyList';
import { WarpEffect } from './components/WarpEffect';

const SceneController: React.FC<{
  travelTarget: { position: THREE.Vector3; lookAt: THREE.Vector3 } | null;
  onArrival: () => void;
}> = ({ travelTarget, onArrival }) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  
  useFrame((state) => {
    if (!travelTarget || !controlsRef.current) return;
    
    const { camera } = state;
    const { position: targetPosition, lookAt: targetLookAt } = travelTarget;
    
    const travelSpeed = 0.03;
    camera.position.lerp(targetPosition, travelSpeed);
    controlsRef.current.target.lerp(targetLookAt, travelSpeed);
    controlsRef.current.update();

    const distance = camera.position.distanceTo(targetPosition);
    if (distance < 0.5) {
      camera.position.copy(targetPosition);
      controlsRef.current.target.copy(targetLookAt);
      onArrival();
    }
  });

  return (
    <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
  );
};

export default function App() {
  const [activeGalaxy, setActiveGalaxy] = useState<string | null>('Milky Way');
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [travelTarget, setTravelTarget] = useState<{ position: THREE.Vector3; lookAt: THREE.Vector3 } | null>(null);

  const handleGalaxySelect = useCallback((name: string) => {
    const galaxy = GALAXY_DATA.find(g => g.name === name);
    if (!galaxy) return;

    setActiveGalaxy(name);
    setIsWarping(true);

    const targetLookAt = new THREE.Vector3(...galaxy.position);
    
    // Position camera in front of the galaxy, based on its size
    const cameraOffset = Math.max(galaxy.params.radius * 3, 30);
    const targetPosition = new THREE.Vector3(
      galaxy.position[0] + cameraOffset,
      galaxy.position[1] + cameraOffset / 2,
      galaxy.position[2] + cameraOffset
    );
    
    setTravelTarget({ position: targetPosition, lookAt: targetLookAt });
  }, []);

  const handleArrival = useCallback(() => {
    setTravelTarget(null);
    setIsWarping(false);
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [20, 20, 20], fov: 75 }}>
        <color attach="background" args={['#00000a']} />
        <fog attach="fog" args={['#00000a', 100, 700]} />
        <ambientLight intensity={0.1} />
        
        <Stars radius={300} depth={50} count={10000} factor={10} saturation={0} fade speed={1} />
        
        {GALAXY_DATA.map((galaxyData) => (
          <Galaxy key={galaxyData.name} data={galaxyData} />
        ))}

        <WarpEffect active={isWarping} />
        
        <SceneController travelTarget={travelTarget} onArrival={handleArrival} />
      </Canvas>
      <GalaxyList onGalaxySelect={handleGalaxySelect} activeGalaxy={activeGalaxy} isWarping={isWarping} />
    </div>
  );
}
