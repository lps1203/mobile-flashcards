import React from 'react'
import { StackNavigator } from 'react-navigation'
import DeckListView from '../components/DeckListView'
import NewDeckView from '../components/NewDeckView'
import IndividualDeckView from '../components/IndividualDeckView'
import NewQuestionView from '../components/NewQuestionView'
import QuizView from '../components/QuizView'

const DeckRoute = StackNavigator({
  IndividualDeck: { 
    screen: IndividualDeckView 
  },
  NewQuestion: { 
    screen: NewQuestionView 
  },
  Quiz: { 
    screen: QuizView 
  }
},
{
  headerMode: 'none'
})
export const RootRoute = StackNavigator({
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
})