import React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

function AnswerView(props) {
  const { navigation, decks } = props
  const { deckTitle, numCards, numCorrect, currentPage } = navigation.state.params
  const backAction = NavigationActions.back()
  
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
      <Text style={{padding: 20, fontSize: 24}}>AnswerView {currentPage+1}/{numCards}</Text>
      <Text>deckTitle: {deckTitle}</Text>
      <Text>numCards: {numCards}</Text>
      <Text>numCorrect: {numCorrect}</Text>
      <Text>currentPage: {currentPage}</Text>

      <View style={{padding: 20}}/>
      <Text>{decks[deckTitle].questions[currentPage].answer}</Text>
      <Button 
        title="Show Question" 
        onPress={() => navigation.dispatch(backAction)}
        // onPress={() => navigation.navigate('Quiz', { deckTitle, numCards, numCorrect, currentPage })}
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
  )
}

const mapStateToProps = state => ({
  decks: state.decks
})
export default connect(mapStateToProps)(AnswerView)