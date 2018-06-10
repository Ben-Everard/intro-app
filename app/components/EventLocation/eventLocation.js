import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles.js';
import images from '../../config/images.js';

export default class eventLocation extends Component {
  render() {
    return(
      <View style={styles.location}>
        <Text style={styles.locationName}>{this.props.name}</Text>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.directions}>
            <Image
              style={styles.locationIcon}
              source={images.events.icons.mapPin}
            />
            <Text style={styles.locationAddress}>{this.props.address}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}