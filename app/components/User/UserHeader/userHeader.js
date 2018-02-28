'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  Image, 
  TouchableHighlight, 
  View 
} from 'react-native';

import styles from './styles.js';
import images from '../../../config/images.js';

export default class userHeader extends Component {
  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <View>
        <ImageBackground
          source={images.accountSetup.background.small}
          style={{width: width, height: 183}}
        >
          <TouchableHighlight style={styles.newUser}>
            <View style={styles.profileImage}>
              <Image 
                style={styles.profile}
                source={{uri: this.props.profilePic }}
              />
              <View style={styles.camera}>
                <Image
                  source={images.accountSetup.icons.camera}
                />
              </View>
            </View>
          </TouchableHighlight>
        </ImageBackground>
      </View>
    )
  }
}