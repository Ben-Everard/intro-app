import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './styles.js';

export default class eventTitle extends Component {
  render() {
    return (
      <Text style={styles.title}>{this.props.title}</Text>
    )
  }
}