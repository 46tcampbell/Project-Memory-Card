import '../styles/Header.css';

export default function Header({ score }) {
  return (
    <header>
      <h1>Pokemon Memory Game</h1>
      <div className='scoreBoard'>
        <div className='currentScore'>Score: {score}</div>
        <div className='bestScore'>Best Score:</div>
      </div>
    </header>
  );
}
