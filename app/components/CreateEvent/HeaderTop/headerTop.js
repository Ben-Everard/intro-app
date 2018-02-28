import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles.js';

export default class headerTop extends Component {
  render() {
    return (
      <View style={styles.text}>
        <Text style={styles.heading}>Make a thing</Text>
        <Text style={styles.subHeading}>Pick some crap</Text>
      </View>
    )
  }
}