import React, { useEffect, useState, useMemo } from 'react';
import { PokemonClient, NamedAPIResourceList, Pokemon } from 'pokenode-ts';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PokedexCard from '../components/PokedexCard';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxStats, setMaxStats] = useState<Record<string, number>>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const navigate = useNavigate();
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const api = new PokemonClient();
        const allPokemon: NamedAPIResourceList = await api.listPokemons(0, 151);
        const fetches = allPokemon.results.map((p) =>
          api.getPokemonByName(p.name)
        );
        const results = await Promise.all(fetches);
        setPokemonList(results);

        // Compute max stats
        const maxStatMap: Record<string, number> = {};
        results.forEach((p) => {
          p.stats.forEach((s) => {
            maxStatMap[s.stat.name] = Math.max(
              maxStatMap[s.stat.name] || 0,
              s.base_stat
            );
          });
        });
        setMaxStats(maxStatMap);
      } catch (error) {
        console.error('Error loading Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchParams(term ? { search: term } : {});
  };

  const handleToggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const filteredList = useMemo(() => {
    return pokemonList.filter((p) => {
      const nameMatches = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const types = p.types.map((t) => t.type.name);
      const typeMatches =
        selectedTypes.length === 0 || selectedTypes.every((type) => types.includes(type));
      return nameMatches && typeMatches;
    });
  }, [pokemonList, searchTerm, selectedTypes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100">
      {/* Sticky Header (title + search bar) */}
      <header className="sticky top-0 bg-white z-20 shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-3">Peacock's Pokédex</h1>
          <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
        </div>
      </header>

      {/* Non-sticky filter + content */}
      <main className="px-6 pt-4 pb-12 max-w-7xl mx-auto">
        <TypeFilter selectedTypes={selectedTypes} onToggleType={handleToggleType} />

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="pokeball animate-spin w-12 h-12 rounded-full border-4 border-red-500 border-t-transparent mb-4"></div>
            <p className="text-indigo-600 text-xl font-medium">Loading Pokémon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {filteredList.map((pokemon) => (
              <div
                key={pokemon.id}
                onClick={() =>
                  navigate(`/pokemon/${pokemon.name}`, { state: { maxStats } })
                }
              >
                <PokedexCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
