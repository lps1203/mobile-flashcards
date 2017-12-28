import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

function IndividualDeckView(props) {
  return (
    <Text>IndividualDeckView</Text>
  )
}

export default connect()(IndividualDeckView)