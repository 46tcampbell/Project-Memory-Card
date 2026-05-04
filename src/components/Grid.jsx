import { useEffect, useState } from 'react';
import '../styles/Grid.css';
import Card from './Card';

export default function Grid({ score, setScore, bestScore, setBestScore }) {
  const [data, setData] = useState([]);

  const shuffle = (data) => {
    const tempData = [...data];
    tempData.sort(() => Math.random() - 0.5);
    return [...tempData];
  };

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
        const pokemonDataWithIsClicked = pokemonData.map((obj) => ({
          id: obj.id,
          name: obj.name,
          imgURL: obj.sprites.front_default,
          isClicked: false,
        }));
        const shuffledPokemonDataWithIsClicked = shuffle(
          pokemonDataWithIsClicked
        );
        setData(shuffledPokemonDataWithIsClicked);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  const toggleIsClicked = (id) => {
    const updatedData = data.map((pokemon) => {
      if (pokemon.id === id) {
        return { ...pokemon, isClicked: !pokemon.isClicked };
      }
      return pokemon;
    });
    const shuffledUpdatedData = shuffle(updatedData);
    setData(shuffledUpdatedData);
  };

  const checkIsClicked = (id) => {
    const clickedPokemon = data.find((pokemon) => pokemon.id === id);
    return clickedPokemon.isClicked;
  };

  const toggleIsClickedAll = () => {
    const updatedData = data.map((pokemon) => ({
      ...pokemon,
      isClicked: false,
    }));

    const shuffledUpdatedData = shuffle(updatedData);
    setData(shuffledUpdatedData);
  };

  const updateBestScore = () => {
    if (score > bestScore) {
      setBestScore(score);
    }
  };

  const clickHandler = (id) => {
    if (!checkIsClicked(id)) {
      setScore(score + 1);
      toggleIsClicked(id);
    }
    if (checkIsClicked(id)) {
      setScore(0);
      updateBestScore();
      toggleIsClickedAll();
    }
  };

  return (
    <div className='grid'>
      {data.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            clickHandler={clickHandler}
          />
        );
      })}
    </div>
  );
}
