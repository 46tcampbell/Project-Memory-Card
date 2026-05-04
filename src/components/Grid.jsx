import { useEffect, useState } from 'react';
import '../styles/Grid.css';
import Card from './Card';

export default function Grid({ score, setScore }) {
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
    // console.log(updatedData);
    // console.log(data);
  };

  const checkIsClicked = (id) => {
    const clickedPokemon = data.find((pokemon) => pokemon.id === id);
    // console.log(data);
    // console.log(clickedPokemon);
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

  const clickHandler = (id) => {
    console.log(data);
    if (!checkIsClicked(id)) {
      setScore(score + 1);
      // setIsClicked(true);
      toggleIsClicked(id);
    }
    if (checkIsClicked(id)) {
      setScore(0);
      // setIsClicked(false);
      toggleIsClickedAll();
    }
    // console.log(e.target.closest('.card').id);
    // shuffle();
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
