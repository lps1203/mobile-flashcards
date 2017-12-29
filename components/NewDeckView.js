import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as ACTION from '../actions'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/api'
import { Ionicons } from '@expo/vector-icons'

import { NavigationActions } from 'react-navigation'

class NewDeckView extends React.Component {
  state = {
    inputValue: ''
  }
  createNewDeck = () => {
    const { addNewDeck, navigation } = this.props
    addNewDeck(this.state.inputValue)
    navigation.navigate('IndividualDeck', { deckTitle: this.state.inputValue })
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
            <Text style={{ fontSize: 26, fontWeight: '800', color: '#444', marginTop: 80 }}>
              New Deck's Title
            </Text>
          </View>
         </View>
          <TextInput
            style={styles.textinput}
            value={this.state.inputValue}
            onChangeText={(inputValue) => 
              this.setState({
                inputValue
              })}
            placeholder="Enter your new deck's title here..."
          />
          <View style={{ flex: 1, justifyContent: 'flex-end'}}>
          {/* button to create a new deck with */}
            <TouchableOpacity onPress={this.createNewDeck}>
                <View style={styles.newDeckButton}>
                  <Text style={{color: '#fff', fontSize: 18, fontWeight: '800'}}>Create New Deck</Text>
                </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}
const mapDispatchToProps = dispatch => ({
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
  }
})

export default connect(null, mapDispatchToProps)(NewDeckView)

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
    padding: 3,
    paddingLeft: 10, 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#555'
  },
  newDeckButton: {
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