import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootRoute } from '../utils/router'
import * as ACTION from '../actions'
import { getDecks } from '../utils/api'

class Main extends Component {
  componentWillMount() {
    // fetch all data from AsyncStorage and save them in the redux store
    this.props.getAllData()
  }
  render() {
    return (
      <RootRoute />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getAllData: () => {
    return getDecks()
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

export default connect(null, mapDispatchToProps)(Main)
