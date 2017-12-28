import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as ACTION from '../actions'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/api'


class DeckListView extends Component {

  render() {
    const { navigation, decks } = this.props
    return (
      <View style={styles.container}>
        {/* button to create a new deck with */}
        <TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
          <View style={styles.newDeckButton}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>New Deck</Text>
          </View>
        </TouchableOpacity>
        {
          // display all the decks off of the redux store
          Object.keys(this.props.decks).map(deckTitle => (
            <TouchableOpacity key={deckTitle} onPress={() => navigation.navigate('IndividualDeck')}>
              <View style={styles.deckCard}>
                <Text style={styles.deckTitle}>{deckTitle}</Text>
                <Text style={styles.cardCount}>{decks[deckTitle].questions.length} cards</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ffff',
    backgroundColor: '#bdb76b',
    paddingTop: 30
  },
  newDeckButton: {
    width: 120, 
    height: 35, 
    backgroundColor: '#666', 
    margin: 7, 
    marginTop: 15, 
    marginRight: 20, 
    padding: 3, 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'flex-end'
  },
  deckCard: {
    backgroundColor: '#efefef',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    marginTop: 8,
    marginBottom: 7,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 20, 
    fontWeight: '900', 
    color: '#444', 
    alignSelf: 'center'
  },
  cardCount: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#777', 
    alignSelf: 'center', 
    paddingTop: 4
  }
})