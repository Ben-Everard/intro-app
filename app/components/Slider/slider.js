import React, { Component } from 'react';
import {
  Text,
  Slider,
  TouchableHighlight,
  View
} from 'react-native';

import images from '../../config/images.js'; 
import styles from './styles.js';

export default class button extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={10}
          thumbImage={images.slider.handle}
          trackImage={images.slider.progress}
          value={5}
        />
      </View>
    )
  }
}