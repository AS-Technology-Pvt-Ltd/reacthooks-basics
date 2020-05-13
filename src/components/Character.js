import React, { useState, useEffect } from "react";

import { useHttp } from "../customhooks/https";

import Summary from "./Summary";

const Character = (props) => {
  // const [isLoading, setIsLoading] = useState(false); replace with custom httpHook
  //const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, fetchData] = useHttp(
    "https://swapi.dev/api/people/" + props.selectedChar,
    [props.selectedChar]
  );

  let loadedCharacter = null;

  if (fetchData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchData.name,
      height: fetchData.height,
      colors: {
        hair: fetchData.hair_color,
        skin: fetchData.skin_color,
      },
      gender: fetchData.gender,
      movieCount: fetchData.films.length,
    };
  }

  // const fetchData = () => {
  //   setIsLoading(false);
  //   fetch("https://swapi.dev/api/people/" + props.selectedChar)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Could not fetch person!");
  //       }
  //       return response.json();
  //     })
  //     .then((charData) => {
  //       const loadedCharacter = {
  //         id: props.selectedChar,
  //         name: charData.name,
  //         height: charData.height,
  //         colors: {
  //           hair: charData.hair_color,
  //           skin: charData.skin_color,
  //         },
  //         gender: charData.gender,
  //         movieCount: charData.films.length,
  //       };
  //       setLoadedCharacter(loadedCharacter);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   fetchData();
  //   return () => {
  //     console.log("componnet cleangi up");
  //   };
  // }, [props.selectedChar]);

  useEffect(() => {
    return () => {
      console.log("componnetdid unmount up");
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character); //react knows about props so we dont need to specify like below

// export default React.memo(Character, (prevProps, nextProps) => {
//   return nextProps.selectedChar === prevProps.selectedChar;
// });
