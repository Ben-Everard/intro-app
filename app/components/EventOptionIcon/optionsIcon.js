import React, { Component } from 'react';
import { Image, TouchableHighlight, View } from 'react-native';

import styles from './styles.js';
import images from '../../config/images.js';

export default class optionIcon extends Component {
  render() {
    return(
      <View style={styles.options}>
        <TouchableHighlight onPress={this.props.onPress}>
          <Image
            source={images.events.option}
          />
        </TouchableHighlight>
      </View>
    )
  }
}