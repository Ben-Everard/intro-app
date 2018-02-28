import React, { Component } from 'react';

import {
  StyleSheet,
  Image
} from 'react-native';

import images from '../../../config/images.js'
import styles from './styles.js'

export default class CustomMarker extends Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={images.slider.handle}
        resizeMode='contain'
      />
    );
  }
}