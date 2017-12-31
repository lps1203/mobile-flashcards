import React from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

function ScoreView(props) {
  const { navigation } = props
  const { deckTitle, numCards, numCorrect } = navigation.state.params
  const score = parseInt(numCorrect/numCards*100)
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: '900', color: '#444', alignSelf: 'center', padding: 10}}>{deckTitle}</Text>
      <View style={{padding: 30}}/>
      <View style={{ alignItems: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: '900', color: '#555'}}>Your score</Text>
        <Text style={{fontSize: 56, fontWeight: '900', color: '#444', padding: 10}}>{score}%</Text>
        <Text style={{fontSize: 24, fontWeight: '800', color: '#444'}}>{numCorrect} out of {numCards}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz', {deckTitle, numCards, numCorrect: 0, currentPage: 0 })}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '800'}}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IndividualDeck', {deckTitle})}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '800'}}>Back to Deck</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ScoreView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdb76b',
    paddingTop: 30,
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