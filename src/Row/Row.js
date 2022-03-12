import React from 'react';

function Row(props) {
  const tiles = props.text
    ? props.text.concat(Array(5 - props.text.length).fill(''))
    : Array(5).fill('');
    
  return (
    <div className="row">
      {tiles.map((value, i) => {
        return (
          <div key={i} className={`tile ${value ? props.states ? props.states[i] : 'tbd' : 'empty'}`}>
            {value}
          </div>
        );
      })}
    </div>
  );
}

export default Row;