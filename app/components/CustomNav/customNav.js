import React, { Component } from 'react';
import { ImageBackground, Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles.js';
import images from '../../config/images.js';

export default class customNav extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPress} >
          <ImageBackground 
            source={images.navigation.pageNav} 
            style={{width: undefined, height: 37}}
            resizeMode="cover"
            >
            <View style={styles.textArrow}>
              <Image
                source={this.props.left === true ? images.arrowLeft : images.arrowDown }
              />
              <Text style={styles.text}>
                {this.props.text}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }
}