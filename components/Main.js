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
    showDeck: false
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
    const newCard = {
      question: 'is c++ object-oriented?',
      answer: 'sure thing'
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.setViewingDeck('ComputerScience')}>
          <View style={{width: 100, height: 30, backgroundColor: 'steelblue', margin: 10, padding: 3, borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Set Deck</Text>
          </View>
        </TouchableOpacity>
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
              <Text>{this.props.decks['C++'].questions[2].question}</Text>
              <Text>{this.props.decks['C++'].questions[2].answer}</Text>
              <Text>{this.props.viewingDeck}</Text>
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
  },
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
  },
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
  },
  setViewingDeck: (title) => {
    try {
      dispatch(ACTION.setViewingDeck(title))
    }
    catch(error) {
      console.log('error in setting viewing deck')
      throw(error)
    }
  },
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
