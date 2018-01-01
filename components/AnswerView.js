import React from 'react'
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native'
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
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: '900', color: '#444', alignSelf: 'center', padding: 10}}>{deckTitle}</Text>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#444'}}>Answer #{currentPage+1}</Text>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#444'}}>{numCards-currentPage-1} Left</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
          <Text style={{ fontSize: 24, fontWeight: '900', color: '#333', alignSelf: 'center', paddingTop: 60, paddingBottom: 20, paddingLeft: 10, paddingRight: 10 }}>{decks[deckTitle].questions[currentPage].answer}</Text>
          <Button 
            title="Show Question" 
            color="#444"
            onPress={() => navigation.dispatch(backAction)}
          />

          <View style={{ flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity style={styles.button} onPress={handleCorrect}>
              <Text style={{color: '#90ee90', fontSize: 18, fontWeight: '900'}}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleIncorrect}>
              <Text style={{color: '#ffb6c1', fontSize: 18, fontWeight: '900'}}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  decks: state.decks
})
export default connect(mapStateToProps)(AnswerView)

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