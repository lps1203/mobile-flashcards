import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Main from './components/Main'
import { setLocalNotification } from './utils/notification'

const store = createStore(reducer)

export default class App extends React.Component {
  componentDidMount() {
    // set local notification for once a day if user hasn't taken a quiz until a specified time of the day
    // to set notification time, go to /utils/notification.js
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
