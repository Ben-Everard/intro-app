import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './styles.js';

export default class homeDetails extends Component {
  render() {
    return (
      <Text style={styles.details}>{this.props.people} people {'\u2022'} {this.props.time} {'\u2022'} {this.props.distance} {'\u2022'} {this.props.location} </Text>
    )
  }
}