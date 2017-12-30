import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import * as ACTION from '../actions'
import { addCardToDeck } from '../utils/api'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'

class NewQuestionView extends React.Component {
  state = {
    questionValue: '',
    answerValue: ''
  }
  createNewCard = () => {
    const { addNewCard, navigation } = this.props
    const { deckTitle } = navigation.state.params
    const newCard = {
      question: this.state.questionValue,
      answer: this.state.answerValue
    }
    addNewCard(deckTitle, newCard)
      .then (() => navigation.navigate('IndividualDeck', { deckTitle }))
  }
  render() {
    const backAction = NavigationActions.back()
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.dispatch(backAction)}>
          <Ionicons name="ios-arrow-back" size={35} style={{ padding: 10, paddingTop: 30 }} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Text style={{ fontSize: 26, fontWeight: '800', color: '#444', marginTop: 80, marginBottom: 10 }}>
              Question & Answer
            </Text>
          </View>
         </View>
          <TextInput
            style={styles.textinput}
            value={this.state.questionValue}
            onChangeText={(questionValue) => 
              this.setState({
                questionValue
              })}
            placeholder="Enter your question here..."
          />
          <TextInput
            style={styles.textinput}
            value={this.state.answerValue}
            onChangeText={(answerValue) => 
              this.setState({
                answerValue
              })}
            placeholder="Enter your answer here..."
          />
          <View style={{ flex: 1, justifyContent: 'flex-end'}}>
          {/* button to create a new deck with */}
            <TouchableOpacity onPress={this.createNewCard}>
                <View style={styles.newCardButton}>
                  <Text style={{color: '#fff', fontSize: 18, fontWeight: '800'}}>Create New Card</Text>
                </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  viewingDeck: state.viewingDeck,
  decks: state.decks
})

const mapDispatchToProps = dispatch => ({
  addNewCard: (title, card) => {
    return addCardToDeck(title, card)
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


export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdb76b',
    paddingBottom: 10
  },
  textinput: {
    height: 40, 
    backgroundColor: '#fff', 
    margin: 20,
    marginTop: 20,
    marginBottom: 0,
    padding: 3,
    paddingLeft: 10, 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#555'
  },
  newCardButton: {
    height: 50, 
    backgroundColor: '#656565', 
    borderRadius: 8,
    margin: 20,
    marginTop: 15,
    marginBottom: 7,
    padding: 3, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
})