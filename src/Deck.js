import { isDisabled } from "@testing-library/user-event/dist/utils";
import axios from "axios";

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
    setIsDisabled(true);

    const result = await axios.get(`${BASE_URL}/${deckId.deckId}/draw`);

    setDrawnCards([...drawnCards, result.data.cards[0]]);

    setIsDisabled(false);

    if (result.data.error) alert("Error: no cards remaining!");
  }

  if (deckId.isLoading) return <p>...loading...</p>;

  //TODO: Move card to own component
  return (
    <>
      <button onClick={drawCard} disabled={isDisabled}>Draw Card</button>

      <div>
        {drawnCards.map(c => c && <img src={c.image} alt={c.code} key={c.code} />)}
      </div>

    </>
  );
}

export default Deck;
