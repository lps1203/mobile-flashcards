import React from 'react'
import { StackNavigator } from 'react-navigation'
import DeckListView from '../components/DeckListView'
import NewDeckView from '../components/NewDeckView'
import IndividualDeckView from '../components/IndividualDeckView'
import NewQuestionView from '../components/NewQuestionView'
import QuizView from '../components/QuizView'
import AnswerView from '../components/AnswerView'
import ScoreView from '../components/ScoreView'

const CardRoute = StackNavigator(
  {
    Quiz: {
      screen: QuizView
    },
    Answer: {
      screen: AnswerView
    },
    Score: {
      screen: ScoreView
    }
  },
  {
    headerMode: 'none'
  }
)

const DeckRoute = StackNavigator(
  {
    IndividualDeck: { 
      screen: IndividualDeckView 
    },
    NewQuestion: { 
      screen: NewQuestionView 
    },
    Quiz: { 
      screen: CardRoute
    }
  },
  {
    headerMode: 'none'
  }
)
export const RootRoute = StackNavigator(
  {
    DeckList: { 
      screen: DeckListView 
    },
    NewDeck: { 
      screen: NewDeckView 
    },
    IndividualDeck: { 
      screen: DeckRoute 
    }
  }, 
  {
    headerMode: 'none'
  }
)