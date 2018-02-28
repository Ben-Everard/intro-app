import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles.js';
import images from '../../../config/images.js';

export default class headerMiddle extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.icons}>
          <View style={styles.imageText}>
            <Image
              style={styles.icon}
              source={images.createEvent.icons.white.cal}
            />
            <Text style={styles.text}>{this.props.date}</Text>
          </View>
          <View style={styles.imageText}>
            <Image
              style={styles.icon}
              source={images.createEvent.icons.white.profile}
            />
            <Text style={styles.text}>{this.props.people} guests</Text>
          </View>
          <View style={styles.imageText}>
            <Image
              style={styles.icon}
              source={images.createEvent.icons.white.clock}
            />
            <Text style={styles.text}>{this.props.time}</Text>
          </View>
        </View>
      </View>
    )
  }
}