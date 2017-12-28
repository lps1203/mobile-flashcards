import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

function NewQuestionView(props) {
  return (
    <Text>NewQuestionView</Text>
  )
}

export default connect()(NewQuestionView)