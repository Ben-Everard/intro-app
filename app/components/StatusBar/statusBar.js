import React, { Component } from 'react';
import { Image, StatusBar, View } from 'react-native';

import styles from './styles.js';
import images from '../../config/images.js'

export default class statusBar extends Component {
  render() {
    return (
      <View style={styles.status}>
        <Image
          source={images.navigation.statusBar}
        />
        <StatusBar
          barStyle="light-content"
        />
      </View>
    )
  }
}