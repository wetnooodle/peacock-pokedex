// src/components/PokedexCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from 'pokenode-ts';

const typeColors: Record<string, string> = {
  normal: 'bg-zinc-300',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-300',
  ice: 'bg-cyan-300',
  fighting: 'bg-orange-600',
  poison: 'bg-purple-400',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-400',
  bug: 'bg-lime-400',
  rock: 'bg-gray-500',
  ghost: 'bg-indigo-600',
  dragon: 'bg-purple-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

type PokedexCardProps = {
  pokemon: Pokemon;
};

const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  return (
    <div className="w-full h-full">
      <Link
        to={`/pokemon/${pokemon.name}`}
        className="block bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-between p-4 hover:scale-105 transition-transform h-full"
      >
        <div className="text-center">
          <img
            src={pokemon.sprites.other?.['official-artwork'].front_default || ''}
            alt={pokemon.name}
            className="w-24 h-24 mx-auto"
          />
          <h2 className="text-lg font-bold capitalize mt-2">{pokemon.name}</h2>
          <p className="text-xs text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((typeInfo) => {
            const typeName = typeInfo.type.name;
            return (
              <span
                key={typeName}
                className={`px-2 py-1 rounded-full text-white text-xs capitalize ${
                  typeColors[typeName] || 'bg-gray-400'
                }`}
              >
                {typeName}
              </span>
            );
          })}
        </div>
      </Link>
    </div>
  );
};

export default PokedexCard;
