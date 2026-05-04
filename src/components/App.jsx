import { useState } from 'react';
import MainSection from './MainSection';
import Header from './Header';

import '../styles/App.css';

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <MainSection
        setScore={setScore}
        score={score}
        setBestScore={setBestScore}
        bestScore={bestScore}
      />
    </>
  );
}
