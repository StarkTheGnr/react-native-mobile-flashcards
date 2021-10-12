import { GET_DECKS, ADD_DECK, ADD_CARD, DELETE_DECK } from "../actions/decks"


export default function decks(state = {}, action)
{
	switch(action.type)
	{
		case GET_DECKS:
			return {
				...(action.decks)
			}
		case ADD_DECK:
			return {
				...state,
				...action.deck
			}
		case ADD_CARD:
			return {
				...state,
				[action.deckKey]: {
					...state[action.deckKey],
					questions: state[action.deckKey].questions.concat({
						question: action.question,
						answer: action.answer
					})
				}
			}
		case DELETE_DECK:
			const newState = { ...state }
			delete newState[action.deckKey]
			return newState
		default:
			return state
	}
}