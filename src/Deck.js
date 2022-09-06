import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "./Card";

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


  /** get deck ID from API and update deckID state */

  async function getDeckID() {
    const result = await axios.get(`${BASE_URL}/new/shuffle`);
    setDeckId({
      deckId: result.data.deck_id,
      isLoading: false,
    });
  }

  useEffect(() => { getDeckID() }, []);


  /** Draw a card, update cards state with new card */

  async function drawCard() {
    setIsDisabled(true); //prevent too-fast clicking
    const result = await axios.get(`${BASE_URL}/${deckId.deckId}/draw`);
    setDrawnCards([...drawnCards, result.data.cards[0]]);
    setIsDisabled(false);

    if (result.data.error) alert("Error: no cards remaining!");
  }

  
  /** get a new deckID, update deckID state, reset drawnCards to empty array */

  async function shuffle() {
    setIsDisabled(true); //prevent too fast clicking
    getDeckID();
    setDrawnCards([]);
    setIsDisabled(false);
  }

  //render loading message while api call completes
  if (deckId.isLoading) return <p>...loading...</p>;

  return (
    <>
      <button onClick={drawCard} disabled={isDisabled}>Draw Card</button>
      <button onClick={shuffle} disabled={isDisabled}>Shuffle</button>
      <div>{drawnCards.map((c) => c && <Card key={c.code} card={c} />)}</div>
    </>
  );
}

export default Deck;
