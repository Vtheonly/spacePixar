
import * as THREE from 'three';

export interface GalaxyData {
  name: string;
  position: [number, number, number];
  params: {
    count: number;
    size: number;
    radius: number;
    branches: number;
    spin: number;
    randomness: number;
    randomnessPower: number;
    colorIn: string;
    colorOut: string;
  };
}

export const GALAXY_DATA: GalaxyData[] = [
  {
    name: 'Milky Way',
    position: [0, 0, 0],
    params: { count: 60000, size: 0.02, radius: 10, branches: 4, spin: 0.5, randomness: 0.4, randomnessPower: 3, colorIn: '#ff6030', colorOut: '#1b3984' }
  },
  {
    name: 'Andromeda (M31)',
    position: [-150, 40, -100],
    params: { count: 80000, size: 0.025, radius: 12, branches: 3, spin: 0.4, randomness: 0.3, randomnessPower: 3, colorIn: '#f0c0ff', colorOut: '#58c0f0' }
  },
  {
    name: 'Triangulum (M33)',
    position: [120, -60, 50],
    params: { count: 40000, size: 0.018, radius: 7, branches: 2, spin: 0.6, randomness: 0.5, randomnessPower: 3, colorIn: '#ffffaa', colorOut: '#88aaff' }
  },
  {
    name: 'Whirlpool (M51)',
    position: [80, 90, 150],
    params: { count: 50000, size: 0.02, radius: 8, branches: 5, spin: 0.8, randomness: 0.2, randomnessPower: 2, colorIn: '#ff8888', colorOut: '#8888ff' }
  },
  {
    name: 'Sombrero (M104)',
    position: [-200, -80, -200],
    params: { count: 70000, size: 0.015, radius: 9, branches: 1, spin: 0.0, randomness: 0.1, randomnessPower: 1, colorIn: '#ffffff', colorOut: '#aaaaaa' }
  },
  {
    name: 'Pinwheel (M101)',
    position: [250, 10, -80],
    params: { count: 65000, size: 0.022, radius: 11, branches: 6, spin: 1.2, randomness: 0.6, randomnessPower: 3.5, colorIn: '#f9d423', colorOut: '#247ba0' }
  },
  {
    name: 'Centaurus A',
    position: [-50, -150, 120],
    params: { count: 55000, size: 0.02, radius: 8.5, branches: 3, spin: 0.3, randomness: 0.8, randomnessPower: 4, colorIn: '#ff5733', colorOut: '#c70039' }
  },
  {
    name: 'Bode\'s Galaxy (M81)',
    position: [180, 100, 20],
    params: { count: 75000, size: 0.021, radius: 9.5, branches: 2, spin: 0.45, randomness: 0.25, randomnessPower: 2.5, colorIn: '#e0f7fa', colorOut: '#00bcd4' }
  },
  {
    name: 'Cigar Galaxy (M82)',
    position: [190, 105, 25],
    params: { count: 30000, size: 0.018, radius: 5, branches: 0, spin: 0, randomness: 1.5, randomnessPower: 2, colorIn: '#f44336', colorOut: '#ffeb3b' }
  },
  {
    name: 'Black Eye Galaxy (M64)',
    position: [-130, 130, -130],
    params: { count: 45000, size: 0.019, radius: 7.5, branches: 2, spin: -0.5, randomness: 0.4, randomnessPower: 3, colorIn: '#fdf498', colorOut: '#f37435' }
  },
  {
    name: 'Cartwheel Galaxy',
    position: [300, -150, -50],
    params: { count: 60000, size: 0.02, radius: 10, branches: 0, spin: 0, randomness: 1, randomnessPower: 1, colorIn: '#4caf50', colorOut: '#ff9800' }
  },
  {
    name: 'Hoag\'s Object',
    position: [-250, 200, 100],
    params: { count: 35000, size: 0.025, radius: 8, branches: 0, spin: 0, randomness: 0.5, randomnessPower: 1, colorIn: '#2196f3', colorOut: '#f0f0f0' }
  },
  {
    name: 'Tadpole Galaxy',
    position: [0, 250, -200],
    params: { count: 50000, size: 0.017, radius: 9, branches: 3, spin: 0.9, randomness: 1.2, randomnessPower: 4, colorIn: '#9c27b0', colorOut: '#3f51b5' }
  },
  {
    name: 'Sculptor Galaxy',
    position: [-80, -200, 80],
    params: { count: 85000, size: 0.023, radius: 13, branches: 4, spin: 0.3, randomness: 0.3, randomnessPower: 2.8, colorIn: '#b2dfdb', colorOut: '#00796b' }
  },
  {
    name: 'Messier 83',
    position: [150, -180, -150],
    params: { count: 70000, size: 0.02, radius: 10, branches: 5, spin: 0.7, randomness: 0.5, randomnessPower: 3, colorIn: '#ffecb3', colorOut: '#ff5722' }
  }
];
