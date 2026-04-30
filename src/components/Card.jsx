import { useEffect, useState } from 'react';
import '../styles/Card.css';

export default function Card({ id, clickHandler }) {
  const [data, setData] = useState({});

  useEffect(() => {
    let ignore = false;

    try {
      const fetchData = async () => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        const pokemonData = await response.json();
        console.log(pokemonData);
        console.log(pokemonData.name);
        console.log(pokemonData.sprites.front_default);
        if (!ignore) {
          setData({ ...pokemonData });
        }
        // const imgSrc = pokemonData.data.images.original.url;
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <div onClick={clickHandler} className='card'>
      <div className='img'>
        <img src={data?.sprites?.front_default} alt='' />
      </div>
      <div className='name'>
        <h2>{data?.name}</h2>
      </div>
    </div>
  );
}
