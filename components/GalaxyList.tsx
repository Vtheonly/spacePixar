
import React from 'react';
import { GALAXY_DATA } from '../constants';

interface GalaxyListProps {
  onGalaxySelect: (name: string) => void;
  activeGalaxy: string | null;
  isWarping: boolean;
}

export const GalaxyList: React.FC<GalaxyListProps> = ({ onGalaxySelect, activeGalaxy, isWarping }) => {
  return (
    <div className="absolute top-0 right-0 h-full w-64 p-4 bg-black bg-opacity-50 backdrop-blur-sm text-white overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-cyan-300">Galaxies</h1>
      <ul className="space-y-2">
        {GALAXY_DATA.map((galaxy) => (
          <li key={galaxy.name}>
            <button
              onClick={() => onGalaxySelect(galaxy.name)}
              disabled={isWarping}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${
                activeGalaxy === galaxy.name
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'hover:bg-gray-700'
              } ${isWarping ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {galaxy.name}
            </button>
          </li>
        ))}
      </ul>
      {isWarping && (
        <div className="absolute bottom-4 left-4 right-4 text-center p-2 bg-blue-900 bg-opacity-70 rounded-lg">
            <p className="text-lg font-semibold animate-pulse">WARP DRIVE ACTIVE</p>
        </div>
      )}
    </div>
  );
};
