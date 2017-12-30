import { AsyncStorage } from 'react-native'
export const UDACIFITNESS_KEY = '12345678901234'

/* Shape of AsyncStorage:

{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

*/

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
