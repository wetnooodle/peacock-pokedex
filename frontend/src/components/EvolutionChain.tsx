// src/components/EvolutionChain.tsx
import React, { useEffect, useState } from 'react';
import { EvolutionChain, PokemonClient, EvolutionClient } from 'pokenode-ts';
import { Link } from 'react-router-dom';

interface EvolutionStage {
  name: string;
  url: string;
}

interface Props {
  pokemonName: string;
}

const EvolutionChainComponent: React.FC<Props> = ({ pokemonName }) => {
  const [chain, setChain] = useState<EvolutionStage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      const speciesApi = new PokemonClient();
      const evoApi = new EvolutionClient();

      try {
        const species = await speciesApi.getPokemonSpeciesByName(pokemonName);
        const chainUrl = species.evolution_chain.url;
        const idMatch = chainUrl.match(/\/(\d+)\/?$/);
        if (!idMatch) return;

        const evolutionData = await evoApi.getEvolutionChainById(Number(idMatch[1]));
        const chainList: EvolutionStage[] = [];

        const walkChain = (node: EvolutionChain['chain']) => {
          chainList.push({ name: node.species.name, url: node.species.url });
          if (node.evolves_to.length > 0) {
            walkChain(node.evolves_to[0]); // only follow one path for now
          }
        };

        walkChain(evolutionData.chain);
        setChain(chainList);
      } catch (err) {
        console.error('Failed to load evolution chain:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemonName]);

  if (loading) {
    return <p className="text-sm text-gray-500 text-center">Loading evolution chain...</p>;
  }

  if (chain.length <= 1) {
    return <p className="text-sm text-gray-400 text-center">This Pokémon does not evolve.</p>;
  }

  return (
    <div className="mt-10 max-w-3xl mx-auto text-center">
      <h3 className="text-xl font-semibold text-indigo-600 mb-4">Evolution Chain</h3>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {chain.map((stage, index) => (
          <React.Fragment key={stage.name}>
            <Link to={`/pokemon/${stage.name}`} className="text-center hover:underline">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokeIdFromUrl(stage.url)}.png`}
                alt={stage.name}
                className="w-20 h-20 object-contain mb-1 mx-auto"
              />
              <p className="capitalize text-sm">{stage.name}</p>
            </Link>
            {index < chain.length - 1 && <span className="text-2xl">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

function getPokeIdFromUrl(url: string): string {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? match[1] : '0';
}

export default EvolutionChainComponent;
