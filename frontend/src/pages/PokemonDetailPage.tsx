// src/pages/PokemonDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { motion } from 'framer-motion';
import PokemonDetail from '../components/PokemonDetail';
import EvolutionChain from '../components/EvolutionChain';

interface LocationState {
  maxStats?: Record<string, number>;
}

// Gen 1 maximum base stats (for scaling fallback)
const GEN1_MAX_STATS: Record<string, number> = {
  hp: 255,
  attack: 134,
  defense: 180,
  'special-attack': 154,
  'special-defense': 180,
  speed: 140
};

const PokemonDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { maxStats } = (location.state || {}) as LocationState;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!name) return;

      try {
        const api = new PokemonClient();
        const data = await api.getPokemonByName(name);
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6"
    >
      <motion.button
        onClick={() => navigate('/', { replace: true })}
        className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-all duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Pokédex
      </motion.button>

      {loading ? (
        <p className="text-center text-lg">Loading Pokémon...</p>
      ) : pokemon ? (
        <>
          <PokemonDetail pokemon={pokemon} maxStats={maxStats || GEN1_MAX_STATS} />
          <EvolutionChain pokemonName={pokemon.name} />
        </>
      ) : (
        <p className="text-center text-red-500">Pokémon not found</p>
      )}
    </motion.div>
  );
};

export default PokemonDetailPage;
