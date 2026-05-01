import '../styles/Card.css';

export default function Card({ imgURL, name, clickHandler }) {
  return (
    <div onClick={clickHandler} className='card'>
      <div className='img'>
        <img src={imgURL} alt='' />
      </div>
      <div className='name'>
        <h2>{name}</h2>
      </div>
    </div>
  );
}
