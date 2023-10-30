import React, { useState, useEffect } from "react";

const App = () => {
  const [joke, setJoke] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    const fetchJoke = async () => {
      try {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const data = await response.json();
        setJoke(data.value);
      } catch (error) {
        console.error("Erro ao buscar piada:", error);
      }
    };

    fetchJoke();
  }, []);

  const likeJoke = () => {
    if (joke) {
      setFavorites([...favorites, joke]);
      localStorage.setItem("favorites", JSON.stringify([...favorites, joke]));
    }
  };

  const deleteJoke = (index) => {
    setDeleteConfirmation(true);
    if (window.confirm("Tem certeza que quer deletar?")) {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setDeleteConfirmation(false);
    } else {
      setDeleteConfirmation(false);
    }
  };

  return (
    <div className="App">
      <h1>Chuck Norris Jokes</h1>
      <p>{joke}</p>
      <button onClick={likeJoke}>Like</button>
      <h2>Favoritos</h2>
      <ul>
        {favorites.map((favJoke, index) => (
          <li key={index}>
            {favJoke}
            <button onClick={() => deleteJoke(index)}>Deletar</button>
          </li>
        ))}
      </ul>
      {deleteConfirmation && <p>Confirmação de exclusão</p>}
    </div>
  );
};

export default App;
