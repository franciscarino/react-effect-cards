import axios from "axios";

import React, { useEffect, useState } from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deckId, setDeckId] = useState({
    deckId: null,
    isLoading: true,
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getDeckID() {
      const result = await axios.get(`${BASE_URL}/new/shuffle`);
      setDeckId({
        deckId: result.data,
        isLoading: false,
      });
    }
    getDeckID();
  }, []);

  async function drawCard() {
    const card = await axios.get(`${BASE_URL}/deck/${deckId}/draw`);
    setCards([...cards,card])
  }

  if (deckId.isLoading) return <p>...loading...</p>;
  return (
    <>
      <button onClick={drawCard}>Draw Card</button>
      
    </>
  );
}

export default Deck;
