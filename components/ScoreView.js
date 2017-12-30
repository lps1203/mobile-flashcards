import React from 'react'
import { View, Text, Button } from 'react-native'

function ScoreView(props) {
  const { navigation } = props
  const { deckTitle, numCards, numCorrect } = navigation.state.params
  return (
    <View>
      <Text style={{fontSize: 24, padding: 20}}>ScoreView</Text>
      <View style={{padding: 20}}/>
      <Text>You got {numCorrect} right of {numCards} questions</Text>
      <View style={{padding: 20}}/>
      <Button title="Restart Quiz" onPress={() => navigation.navigate('Quiz', {deckTitle, numCards, numCorrect: 0, currentPage: 0 })}/>
      <Button title="Back to Deck" onPress={() => navigation.navigate('IndividualDeck', {deckTitle})}/>
    </View>
  )
}

export default ScoreView