import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as ACTION from '../actions'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/api'

function DeckListView(props) {
  const { navigation, decks } = props
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: '900', color: '#444', alignSelf: 'center', padding: 10}}>Decks</Text>
      <ScrollView>
      {
        // display all the decks off of the redux store
        Object.keys(decks).map(deckTitle => (
          <TouchableOpacity key={deckTitle} onPress={() => navigation.navigate('IndividualDeck', {deckTitle})}>
            <View style={styles.deckCard}>
              <Text style={styles.deckTitle}>{deckTitle}</Text>
              <Text style={styles.cardCount}>{decks[deckTitle].questions.length} cards</Text>
            </View>
          </TouchableOpacity>
        ))
      }
      </ScrollView>
      {/* button to create a new deck with */}
      <TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
        <View style={styles.newDeckButton}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '800'}}>New Deck</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}


const mapStateToProps = state => ({
  viewingDeck: state.viewingDeck,
  decks: state.decks
})

export default connect(mapStateToProps)(DeckListView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdb76b',
    paddingTop: 30,
    paddingBottom: 10
  },
  newDeckButton: {
    height: 50, 
    backgroundColor: '#656565', 
    borderRadius: 8,
    margin: 20,
    marginTop: 8,
    marginBottom: 7,
    padding: 3, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  deckCard: {
    backgroundColor: '#efefef',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
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