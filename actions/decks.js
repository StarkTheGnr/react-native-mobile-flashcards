export const GET_DECKS = "GET_DECKS"
export const ADD_DECK = "ADD_DECK"
export const DELETE_DECK = "DELETE_DECK"
export const ADD_CARD = "ADD_CARD"

export function getDecksAction(decks)
{
	return {
		type: GET_DECKS,
		decks
	}
}

export function addDeckAction(deck)
{
	return {
		type: ADD_DECK,
		deck
	}
}


export function deleteDeckAction(deckKey)
{
	return {
		type: DELETE_DECK,
		deckKey
	}
}

export function addCardAction(question, answer, deckKey)
{
	return {
		type: ADD_CARD,
		question,
		answer,
		deckKey
	}
}