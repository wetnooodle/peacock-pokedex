// src/components/TypeFilter.tsx

import React from 'react';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

interface TypeFilterProps {
  selectedTypes: string[];
  onToggleType: (type: string) => void;
}

const typeColors: Record<string, string> = {
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-300',
  psychic: 'bg-pink-400',
  ice: 'bg-cyan-300',
  ground: 'bg-yellow-600',
  rock: 'bg-gray-500',
  flying: 'bg-indigo-300',
  poison: 'bg-purple-400',
  bug: 'bg-lime-400',
  ghost: 'bg-indigo-600',
  dragon: 'bg-purple-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
  normal: 'bg-zinc-300',
  fighting: 'bg-orange-600'
};

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedTypes, onToggleType }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onToggleType(type)}
          className={`text-sm px-3 py-1 rounded-full text-white capitalize transition-all 
            ${selectedTypes.includes(type) ? 'ring-2 ring-offset-2 ring-black' : 'opacity-60'}
            ${typeColors[type] || 'bg-gray-300'}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;
