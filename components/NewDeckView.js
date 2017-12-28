import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

function NewDeckView(props) {
  return (
    <Text>NewDeckView</Text>
  )
}

export default connect()(NewDeckView)