import { useEffect, useState } from 'react';
import '../styles/Grid.css';
import Card from './Card';

export default function Grid() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const pokemonIds = [3, 6, 9, 12, 15, 18, 20, 22, 24, 25, 28, 31];

    const fetchData = async () => {
      try {
        const promises = pokemonIds.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
            signal: controller.signal,
          }).then((res) => res.json())
        );
        const pokemonData = await Promise.all(promises);
        setData(pokemonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  const shuffle = () => {
    const tempData = [...data];
    tempData.sort(() => Math.random() - 0.5);
    setData([...tempData]);
  };

  return (
    <div className='grid'>
      {data.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            imgURL={pokemon.sprites.front_default}
            name={pokemon.name}
            clickHandler={shuffle}
          />
        );
      })}
    </div>
  );
}
