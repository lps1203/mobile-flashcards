import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import * as ACTION from '../actions'
import { addCardToDeck } from '../utils/api'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'

class IndividualDeckView extends React.Component {
  state = {
    bounceValue: new Animated.Value(1),
  }
  componentDidMount() {
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { 
        duration: 1000,
        toValue: 1.7
      }),
      Animated.spring(bounceValue, { 
        toValue: 1,
        friction: 2
      })
    ]).start()
  }
  render() {
    const backAction = NavigationActions.back()
    const { navigation, decks } = this.props
    const { deckTitle } = navigation.state.params
    const numCards = decks[deckTitle].questions.length
    const { bounceValue } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('DeckList')}>
          <Ionicons name="ios-arrow-back" size={35} style={{ padding: 10, paddingTop: 30 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
          <Animated.Text style={{ fontSize: 28, fontWeight: '900', color: '#333', transform: [{scale: bounceValue}] }}>
            {deckTitle}
          </Animated.Text>
          <Text style={{ fontSize: 24, fontWeight: '900', color: '#555', alignSelf: 'center', marginTop: 10 }}>
            {numCards} cards
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
          <TouchableOpacity onPress={() => navigation.navigate('Quiz', {deckTitle, numCards, numCorrect: 0, currentPage: 0 })}>
              <View style={styles.button}>
                <Text style={{color: '#fff', fontSize: 18, fontWeight: '800'}}>Start Quiz</Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  decks: state.decks
})

export default connect(mapStateToProps)(IndividualDeckView)

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