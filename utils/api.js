import { AsyncStorage } from 'react-native'
export const UDACIFITNESS_KEY = '1234567890'

// getDecks() 
export function getDecks() {
  return AsyncStorage.getItem(UDACIFITNESS_KEY)
    .then(results => JSON.parse(results))
}


// getDeck(title)
export function getDeck(title) {
  return getDecks()
    .then(decks => decks[title])
}

// saveDeckTitle(title)
export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(UDACIFITNESS_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

// addCardToDeck(title, card)
export function addCardToDeck(title, card) {
  return getDeck(title)
    .then(deck => {
      const newQuestions = deck['questions'].concat([card])
      return AsyncStorage.mergeItem(UDACIFITNESS_KEY, JSON.stringify({
        [title]: {
          title: title,
          questions: newQuestions
        }
      }))
    })
}


