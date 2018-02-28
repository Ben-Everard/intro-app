import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './styles.js';

export default class eventDescription extends Component {
  render() {
    return(
      <Text style={styles.description}>{this.props.description}</Text>
    )
  }
}