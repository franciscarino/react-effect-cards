import axios from "axios";
import Card from "./Card";

import React, { useEffect, useState } from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

/** Deck component
 *
 * Uses call deck API.
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

  const [drawnCards, setDrawnCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  async function getDeckID() {
    const result = await axios.get(`${BASE_URL}/new/shuffle`);
    setDeckId({
      deckId: result.data.deck_id,
      isLoading: false,
    });
  }

  useEffect(() => {
    getDeckID();
  }, []);

  /** Draw a card, update cards state with new card */
  async function drawCard() {
    setIsDisabled(true);
    const result = await axios.get(`${BASE_URL}/${deckId.deckId}/draw`);
    setDrawnCards([...drawnCards, result.data.cards[0]]);
    setIsDisabled(false);

    if (result.data.error) alert("Error: no cards remaining!");
  }

  async function shuffle() {
    setIsDisabled(true);
    getDeckID();
    setDrawnCards([]);
    setIsDisabled(false);
  }

  if (deckId.isLoading) return <p>...loading...</p>;

  return (
    <>
      <button onClick={drawCard} disabled={isDisabled}>
        Draw Card
      </button>
      <button onClick={shuffle} disabled={isDisabled}>
        Shuffle
      </button>

      <div>{drawnCards.map((c) => c && <Card key={c.code} card={c} />)}</div>
    </>
  );
}

export default Deck;
