// components/PokemonDetail.tsx
import React from 'react';
import { Pokemon } from 'pokenode-ts';

interface Props {
  pokemon: Pokemon;
}

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-300',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-400',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-indigo-700',
  dark: 'bg-gray-700',
  dragon: 'bg-indigo-900',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

const PokemonDetail: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={pokemon.sprites.other?.['official-artwork']?.front_default ?? ''}
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
        />
        <div>
          <h2 className="text-4xl font-bold capitalize text-indigo-700 mb-2">
            {pokemon.name}
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {pokemon.types.map((typeSlot) => {
              const type = typeSlot.type.name;
              return (
                <span
                  key={type}
                  className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${typeColors[type] ?? 'bg-gray-500'}`}
                >
                  {type}
                </span>
              );
            })}
          </div>

          <div className="text-gray-700 mb-4 space-y-1">
            <p><strong>Height:</strong> {pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
            <p>
              <strong>Abilities:</strong>{' '}
              {pokemon.abilities
                .map((ab) => ab.ability.name.replace('-', ' '))
                .join(', ')}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Base Stats</h3>
        <div className="space-y-2">
          {pokemon.stats.map((statObj) => (
            <div key={statObj.stat.name}>
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span className="capitalize">{statObj.stat.name.replace('-', ' ')}</span>
                <span>{statObj.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-indigo-500"
                  style={{ width: `${(statObj.base_stat / 255) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
