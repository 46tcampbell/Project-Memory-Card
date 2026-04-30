// import { useEffect, useState } from 'react';
import '../styles/Grid.css';
import Card from './Card';

export default function Grid() {
  const pokemonIds = [3, 6, 9, 12, 15, 18, 20, 22, 24, 25, 28, 31];
  const shuffle = () => {
    pokemonIds.sort(() => Math.random() - 0.5);
    console.log(pokemonIds);
  };
  return (
    <div className='grid'>
      {pokemonIds.map((id) => {
        return <Card key={id} id={id} clickHandler={shuffle} />;
      })}
    </div>
    /* Inside the above, have a rendering list that uses numbers in an array
    to pass to the card component and also pass the shuffle function so that it can run 
    on a click on a card.
    */
  );
}
