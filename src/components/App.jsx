import { useState } from 'react';
// import Card from './Card.jsx';
// import Grid from './Grid';
import Main from './Main';
import Header from './Header';

import '../styles/App.css';

export default function App() {
  const [score, setScore] = useState(0);
  return (
    <>
      <Header score={score} />
      <Main setScore={setScore} score={score} />
    </>
  );
}
