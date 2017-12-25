import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity } from 'react-native'
import { UDACIFITNESS_KEY } from './utils/api'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from './utils/api'


export default class App extends React.Component {

  state = {
    showData: false,
    data: {}
  }
  save= () => {
    saveDeckTitle('ComputerScience')
  }
  //   const card = {
  //     question: 'Who is the father of classical mechanics?',
  //     answer: 'Sir Isaac Newton'
  //   }
  //   addCardToDeck('Math', card)
  // }

  // save = () => {
    // AsyncStorage.setItem('12345', JSON.stringify({
    //   React: {
    //     title: 'React',
    //     questions: [
    //       {
    //         question: 'What is React?',
    //         answer: 'A library for managing user interfaces'
    //       },
    //       {
    //         question: 'Where do you make Ajax requests in React?',
    //         answer: 'The componentDidMount lifecycle event'
    //       }
    //     ]
    //   },
    //   JavaScript: {
    //     title: 'JavaScript',
    //     questions: [
    //       {
    //         question: 'What is a closure?',
    //         answer: 'The combination of a function and the lexical environment within which that function was declared.'
    //       }
    //     ]
    //   }
    // }))
  //   this.setState({
  //     showData: false
  //   })
  

  load= () => {
    getDecks()
      .then(obj => {
        this.setState({
          showData: false,
          data: obj
        })
      })
    // getDeck('Chemistry')
    //   .then(obj => {
    //     this.setState({
    //       showData: false,
    //       data: obj
    //     })
    //   })
  }

  display = () => {
    this.setState({
      showData: true
    })
  }

  addCard = () => {
    const card = {
      question: 'Java === JavaScript ?',
      answer: 'false'
    }
    addCardToDeck('ComputerScience', card)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.save}>
          <Text>Click to save data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.load}>
          <Text>Click to load data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.display}>
          <Text>Click to display</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.addCard}>
          <Text>Click to add card</Text>
        </TouchableOpacity>
        {
          this.state.showData === true && 
            <View>
              <Text>{this.state.data.Chemistry.questions[0].question}</Text>
              <Text>{this.state.data.Chemistry.questions[1].question}</Text>
              <Text>{this.state.data.Chemistry.questions[2].question}</Text>
              <Text>{this.state.data.ComputerScience.questions[0].question}</Text>
              <Text>{this.state.data.ComputerScience.questions[0].answer}</Text>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
})
