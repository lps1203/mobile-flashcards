export const SET_VIEWING_DECK = 'SET_VIEWING_DECK'
export const GET_DECKS = 'GET_DECKS'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function setViewingDeck(viewingDeckTitle) {
  return {
    type: SET_VIEWING_DECK,
    viewingDeck: viewingDeckTitle
  }
}

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks
  }
}

export function saveDeckTitle(title) {
  return {
    type: SAVE_DECK_TITLE,
    newDeck: title
  }
}

export function addCardToDeck(title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    newCard: { title, card }
  }
}
