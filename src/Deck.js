import axios from "axios";

import React, { useEffect, useState } from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";


/** Deck component
 * 
 * State:
 *  - deckID
 *  - cards
 * 
 * App -> Deck
 */
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
        deckId: result.data.deck_id,
        isLoading: false,
      });
    }
    getDeckID();
  }, []);

  /** Draw a card, update cards state with new card */
  async function drawCard() {
    console.log("deckID", deckId);
    const result = await axios.get(`${BASE_URL}/${deckId.deckId}/draw`);
    console.log("card result", result);
    console.log("cards", cards);

    setCards([...cards, result.data.cards[0]]);
  }

  if (deckId.isLoading) return <p>...loading...</p>;
  return (
    <>
      <button onClick={drawCard}>Draw Card</button>

      <div>
        {cards.map(c => <img src={c.image} alt={c.code} key={c.code} />)}
      </div>

    </>
  );
}

export default Deck;
