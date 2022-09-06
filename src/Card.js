/** Card Component to display a card
 *  props:
 * -card object: {
			"code": "7S",
			"image": "https://deckofcardsapi.com/static/img/7S.png",
			"images": {
				"svg": "https://deckofcardsapi.com/static/img/7S.svg",
				"png": "https://deckofcardsapi.com/static/img/7S.png"
			},
			"value": "7",
			"suit": "SPADES"
		}
 */

function Card ({card}) {
 return <img src={card.image} alt={card.code} />
}

export default Card