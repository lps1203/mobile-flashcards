import { 
  GET_DECKS, 
  SAVE_DECK_TITLE, 
  ADD_CARD_TO_DECK
 } from '../actions'

const initialState = {
  decks: {}
}

function reducer(state = initialState, action) {
  const { decks, newDeck, newCard } = action
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        decks
      }
    case SAVE_DECK_TITLE:
      return {
        ...state,
        decks: {
          ...state.decks,
          [newDeck]: {
            title: newDeck,
            questions: []
          }
        }
      }
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [newCard.title]: {
            title: newCard.title,
            questions: state.decks[newCard.title]['questions'].concat([newCard.card])
          }
        }
      }
    default:
      return state
  }
}

export default reducer