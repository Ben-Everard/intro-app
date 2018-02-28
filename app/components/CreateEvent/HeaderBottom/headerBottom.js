import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles.js';
import images from '../../../config/images.js';

export default class headerBottom extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.icons}>
          <View style={styles.imageText}>
            <Image
              style={styles.icon}
              source={this.props.eventIcon}
            />
            <Text style={styles.text}>{this.props.eventType}</Text>
          </View>
        </View>
      </View>
    )
  }
}