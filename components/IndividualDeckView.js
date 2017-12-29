import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as ACTION from '../actions'
import { addCardToDeck } from '../utils/api'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'

function IndividualDeckView(props) {
  const backAction = NavigationActions.back()
  const { navigation, decks } = props
  const { deckTitle } = navigation.state.params
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.dispatch(backAction)}>
        <Ionicons name="ios-arrow-back" size={35} style={{ padding: 10, paddingTop: 30 }} />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
        <Text style={{ fontSize: 28, fontWeight: '900', color: '#333' }}>
          {deckTitle}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: '900', color: '#555', alignSelf: 'center', marginTop: 10 }}>
          {decks[deckTitle] ? decks[deckTitle].questions.length : 0} cards
        </Text>
        </View>
      </View>
      {/* button to create a new deck with */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {deckTitle})}>
            <View style={styles.button}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: '800'}}>Create New Question</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Quiz', {deckTitle})}>
            <View style={styles.button}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: '800'}}>Start a Quiz</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  decks: state.decks
})

const mapDispatchToProps = dispatch => ({
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeckView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdb76b',
    paddingBottom: 10
  },
  button: {
    height: 50, 
    backgroundColor: '#656565', 
    borderRadius: 8,
    margin: 20,
    marginTop: 7,
    marginBottom: 7,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
})