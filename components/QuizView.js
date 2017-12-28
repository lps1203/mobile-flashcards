import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

function QuizView(props) {
  return (
    <Text>QuizView</Text>
  )
}

export default connect()(QuizView)