/*
@ useEffect ==> for mananging side effects ,it always trigger after component render


one agr:    it takes function as an argument

two agr: array of depenedencies ,when it will trigger

ex : [] //that data will change ,empty means no data so it will not trigger that is equivalent to componentDidMount
    

we can handle by this ==>componentDidMount,componentDidUpdate,ComponentWillUnmount




ShouldComponentUpdate ==>React.memo(ComponentName)

it will work like PureComponent ,it will automatically look for

*/

import React, { Component, useState, useEffect } from "react";

import "./CharPicker.css";
import { useHttp } from "../customhooks/https";

const CharPicker = (props) => {
  const [isLoading, fetchData] = useHttp("https://swapi.dev/api/people", []);
  const selectedCharacters = fetchData
    ? fetchData.results.slice(0, 5).map((char, index) => ({
        name: char.name,
        id: index + 1,
      }))
    : [];

  let content = <p>Loading characters...</p>;

  if (!isLoading && selectedCharacters && selectedCharacters.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {selectedCharacters.map((char) => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!selectedCharacters || selectedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
