import { useState, useEffect } from 'react';
import Row from './Row';

import dictionary from './Data/dictionary.json';
import answers from './Data/answers.json';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function App() {
  const [rows, setRows] = useState([]);
  const [text, setText] = useState([]);
  const [pointer, setPointer] = useState(0);

  const [answer, setAnswer] = useState(answers[Math.floor(Math.random() * answers.length)]);
  const [gameOver, setGameOver] = useState(false);

  function handleKey(e) {
    if (gameOver) return;
    const key = e.key.toLowerCase();

    if (key === 'enter' && text.length === 5) submit();
    if (key === 'backspace' && text.length > 0) backspace();
    if (!alphabet.includes(key) || text.length === 5) return;

    setText((current) => {
      current.push(key);
      return [...current];
    });
  }

  function submit() {
    if (!dictionary.includes(text.join(''))) return;

    setPointer(pointer + 1);
    if (pointer === 5) setGameOver(true);

    let states = [];

    if (text.join('') === answer) {
      setGameOver(true);
      states = Array(5).fill('correct');
    } else {
      text.forEach((char, index) => {
        if (answer.charAt(index) === char) return states.push('correct');
        if (answer.includes(char)) return states.push('present');
        return states.push('wrong');
      });
    }

    setRows((current) => {
      current.push({
        text: text,
        states: states,
      });
      return [...current];
    });
    setText([]);
  }

  function backspace() {
    setText((current) => {
      current.pop();
      return [...current];
    });
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  const wordle = [];
  for (let i = 0; i < 6; i++) {
    wordle.push(
      <Row
        key={i}
        text={i === pointer ? text : rows[i]?.text}
        states={rows[i]?.states}
      />
    );
  }

  return (
    <div className='app'>
      <h2>Wordle 👍</h2>
      <div className='wordle'>{wordle}</div>
    </div>
  );
}

export default App;
