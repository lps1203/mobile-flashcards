import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootRoute } from '../utils/router'
import * as ACTION from '../actions'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/api'

class Main extends Component {
  componentWillMount() {
    // fetch all data from AsyncStorage and save them in the redux store
    this.props.getAllData()
  }
  render() {
    return (
      <RootRoute />
    )
  }
}

const mapStateToProps = state => ({
  viewingDeck: state.viewingDeck,
  decks: state.decks
})

const mapDispatchToProps = dispatch => ({
  getAllData: () => {
    getDecks()
      .then(
        decks => {
          dispatch(ACTION.getDecks(decks))
        },
        error => {
          console.log('error in fetching data')
          throw(error)
        }
      )
  },
  addNewDeck: (title) => {
    saveDeckTitle(title)
      .then(
        () => {
          dispatch(ACTION.saveDeckTitle(title))
        },
        error => {
          console.log('error in adding new deck')
          throw(error)
        }
      )
  },
  addNewCard: (title, card) => {
    addCardToDeck(title, card)
      .then(
        () => {
          dispatch(ACTION.addCardToDeck(title, card))
        },
        error => {
          console.log('error in adding new card')
          throw(error)
        }
      )
  },
  setViewingDeck: (title) => {
    try {
      dispatch(ACTION.setViewingDeck(title))
    }
    catch(error) {
      console.log('error in setting viewing deck')
      throw(error)
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
