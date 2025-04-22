// src/components/PokemonDetail.tsx
import React, { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { motion, useAnimationControls } from 'framer-motion';

interface Props {
  pokemon: Pokemon;
  maxStats: Record<string, number>;
}

const statDescriptions: Record<string, string> = {
  hp: "Hit Points — how much damage this Pokémon can take.",
  attack: "Physical attack power.",
  defense: "Physical defense against attacks.",
  'special-attack': "Power of special (non-physical) attacks.",
  'special-defense': "Resistance against special attacks.",
  speed: "How fast the Pokémon acts in battle."
};

const getStatColor = (value: number) => {
  if (value < 40) return 'bg-red-400';
  if (value < 80) return 'bg-yellow-400';
  if (value < 120) return 'bg-green-400';
  return 'bg-green-600';
};

const PokemonDetail: React.FC<Props> = ({ pokemon, maxStats }) => {
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedStats((prev) => {
        const next: Record<string, number> = {};
        let allDone = true;
        pokemon.stats.forEach((s) => {
          const current = prev[s.stat.name] || 0;
          if (current < s.base_stat) {
            next[s.stat.name] = current + Math.ceil(s.base_stat / 20);
            allDone = false;
          } else {
            next[s.stat.name] = s.base_stat;
          }
        });
        return allDone ? prev : next;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [pokemon]);

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
            {pokemon.types.map((typeSlot) => (
              <span
                key={typeSlot.type.name}
                className="px-3 py-1 text-white text-sm rounded-full capitalize bg-indigo-500"
              >
                {typeSlot.type.name}
              </span>
            ))}
          </div>

          <div className="text-gray-700 mb-4 space-y-1">
            <p><strong>Height:</strong> {pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
            <p>
              <strong>Abilities:</strong>{' '}
              {pokemon.abilities.map((ab) => ab.ability.name.replace('-', ' ')).join(', ')}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Base Stats</h3>
        <div className="space-y-4">
          {pokemon.stats.map((statObj) => {
            const name = statObj.stat.name;
            const statLabel = name.replace('-', ' ');
            const baseStat = animatedStats[name] || 0;
            const max = maxStats[name] || 100;
            const percentage = (statObj.base_stat / max) * 100;

            return (
              <div key={name}>
                <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                  <div className="capitalize relative group">
                    {statLabel}
                    <div className="absolute top-full mt-1 left-0 w-60 text-xs text-white bg-gray-800 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      {statDescriptions[name] || '—'}
                    </div>
                  </div>
                  <div>{baseStat}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${getStatColor(statObj.base_stat)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
