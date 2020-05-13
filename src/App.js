import React, { Component, useState } from "react";

import CharPicker from "./components/CharPicker";
import Character from "./components/Character";

const App = () => {
  const [choosenSide, setChoosenSide] = useState("light");
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [destroyed, setDestroyed] = useState(false);
  const sideHandler = (side) => {
    setChoosenSide(side);
  };

  const charSelectHandler = (event) => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };

  let content = (
    <React.Fragment>
      <CharPicker
        side={choosenSide}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={selectedCharacter} />
      <button onClick={() => sideHandler("light")}>Light Side</button>
      <button onClick={() => sideHandler("dark")}>Dark Side</button>
      {choosenSide === "dark" && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;
