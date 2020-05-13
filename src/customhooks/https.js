import React, { useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log("sending https request===>", url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setFetchData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, dependencies);

  return [isLoading, fetchData]; //this can be anything array string object because its custom and it can return many arguments not limited to 1 or two
};

/*


you cant use customHook with in real react hooks but you can use default hook in custom hook
 dont use hooks in 'if statement, for,'only use in top level of function


*/
