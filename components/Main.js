import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { UDACIFITNESS_KEY } from '../utils/api'
import * as ACTION from '../actions'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/api'
import { GET_DECKS } from '../actions'

class DeckCard extends React.Component {

  state = {
    selectedDeck: null
  }

  render() {
    const { deckTitle, deckContent, goToDeck } = this.props  
    return (
      <View style={styles.deckCard}>
        <TouchableOpacity onPress={goToDeck}>
          <Text style={{fontSize: 18}}>{deckTitle} || {deckContent.questions.length} cards</Text>
        </TouchableOpacity>

        
      </View>
    )

  }

}


class Main extends React.Component {

  state = {
    showDeck: false,
    showingDeck: null,
    decks: {},
    deck: {}
  }

  componentWillMount() {
    this.props.getAllData()
  }

  save= () => {
    saveDeckTitle('ComputerScience')
  }

  loadDecks= () => {
    getDecks()
      .then(obj => {
        this.setState({
          decks: obj
        })
      })
  }

  loadDeck = () => {
    getDeck('Chemistry')
      .then(obj => {
        this.setState({
          deck: obj
        })
      })
  }

  display = () => {
    this.setState({
      showDeck: true
    })
  }

  addCard = () => {
    const card = {
      question: 'ECMAScript === JavaScript ?',
      answer: 'true'
    }
    addCardToDeck('ComputerScience', card)
  }

  goToDeck = () => {
    const card = {
      question: 'what is your name?',
      answer: 'javascripter'
    }
    ACTION.addCardToDeck('ComputerScience', card)

  }

  show = () => {
    this.setState(state => ({
      showDeck: !state.showDeck
    }))
  }

  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        {
          Object.keys(decks).map(title => (
            <DeckCard
              key={title}
              deckTitle={title}
              deckContent={this.props.decks[title]}
              goToDeck={this.goToDeck} /> 
          ))
        }
        <TouchableOpacity onPress={this.show}>
          <Text>SHOW</Text>
        </TouchableOpacity>
        {
          this.state.showDeck && (
            <View>
              <Text>{this.props.decks['ComputerScience']['questions'][1].question}</Text>
              <Text>{this.props.decks['ComputerScience']['questions'][1].answer}</Text>
            </View>
          )
        }
      </View>
    )
  }

}

const mapStateToProps = state => ({
  viewingDeck: state.viewingDeck,
  decks: state.decks
})

const mapDispatchToProps = dispatch => ({
  getAllData: () => {
    getDecks()
      .then(
        decks => {
          dispatch(ACTION.getDecks(decks))
        },
        error => {
          console.log('error in fetching data')
          throw(error)
        }
      )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  deckCard: {
    backgroundColor: '#efefef',
    borderColor: '#999',
    borderRadius: 5,
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
