import { 
  SET_VIEWING_DECK,
  GET_DECKS, 
  SAVE_DECK_TITLE, 
  ADD_CARD_TO_DECK
 } from '../actions'

const initialState = {
  viewingDeck: null,
  decks: {}
}

function reducer(state = initialState, action) {
  const { viewingDeck, decks, newDeck, newCard } = action
  switch (action.type) {
    case SET_VIEWING_DECK:
      return {
        ...state,
        viewingDeck
      }
    case GET_DECKS:
      return {
        ...state,
        decks
      }
    case SAVE_DECK_TITLE:
      return {
        ...state,
        decks: {
          ...decks,
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
          ...decks,
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