import React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'

function QuizView(props) {
  const { navigation, decks } = props
  const { deckTitle, numCards, numCorrect, currentPage } = navigation.state.params
  const handleCorrect = () => {
    numCards === currentPage + 1
    ? navigation.navigate('Score', { deckTitle, numCards, numCorrect: numCorrect+1 })
    : navigation.navigate('Quiz', { deckTitle, numCards, numCorrect: numCorrect+1, currentPage: currentPage+1})
  }
  const handleIncorrect = () => {
    numCards === currentPage + 1
    ? navigation.navigate('Score', { deckTitle, numCards, numCorrect })
    : navigation.navigate('Quiz', { deckTitle, numCards, numCorrect, currentPage: currentPage+1})
  }
  return (
    <View>
      <Text style={{padding: 20, fontSize: 24}}>QuizView {currentPage+1}/{numCards}</Text>
      <Text>deckTitle: {deckTitle}</Text>
      <Text>numCards: {numCards}</Text>
      <Text>numCorrect: {numCorrect}</Text>
      <Text>currentPage: {currentPage}</Text>
      {
        numCards === 0 
        ? <View>
            <Text>No questions. Go back and create cards!</Text>
            <Button title="Back to Deck" onPress={() => navigation.navigate('IndividualDeck', {deckTitle})}/>
          </View>
        : <View>
            <View style={{padding: 20}}/>
            <Text>{decks[deckTitle].questions[currentPage].question}</Text>
            <Button 
              title="Show answer"
              onPress={() => navigation.navigate('Answer', { deckTitle, numCards, numCorrect, currentPage})}
            />
            <View style={{padding: 20}}/>
            <Button 
              title="Correct" 
              onPress={handleCorrect}
            />
            <Button 
              title="InCorrect" 
              onPress={handleIncorrect}
            />
          </View>
      }
    </View>
  )
}

const mapStateToProps = state => ({
  decks: state.decks
})
export default connect(mapStateToProps)(QuizView)