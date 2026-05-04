import '../styles/Card.css';

export default function Card({ pokemon, clickHandler }) {
  return (
    <div
      onClick={() => clickHandler(pokemon.id)}
      id={pokemon.id}
      className='card'
    >
      <div className='img'>
        <img src={pokemon.imgURL} alt='' />
      </div>
      <div className='name'>
        <h2>{pokemon.name}</h2>
      </div>
    </div>
  );
}
