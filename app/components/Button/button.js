import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles.js';

export default class button extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <TouchableHighlight style={styles.button} onPress={this.props.onPress} disabled={this.props.disabled}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}