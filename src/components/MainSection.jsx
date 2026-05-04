import '../styles/MainSection.css';
import Grid from './Grid';

export default function MainSection({
  score,
  setScore,
  bestScore,
  setBestScore,
}) {
  return (
    <main>
      <p>
        Get points by clicking on an image but don't click on any more than
        once!
      </p>
      <Grid
        setScore={setScore}
        score={score}
        setBestScore={setBestScore}
        bestScore={bestScore}
      />
    </main>
  );
}
