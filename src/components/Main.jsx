import '../styles/Main.css';
import Grid from './Grid';

export default function Main({ score, setScore }) {
  return (
    <main>
      <p>
        Get points by clicking on an image but don't click on any more than
        once!
      </p>
      <Grid setScore={setScore} score={score} />
    </main>
  );
}
