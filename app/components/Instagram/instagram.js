import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import Swiper from 'react-native-swiper';
import styles from './styles.js';
import images from '../../config/images.js';


export default class Instagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null
    }
  }

  slides(data) {
    let images = [];
    let count = 0;
    let top = [];
    let bottom = [];
    let imageHolder = []
    data.map((image, i) => {
      if (count <= 2 ) {
        top.push(
          <Image 
            source={{uri: image.images.thumbnail.url}} 
            style={styles.image}  
            key={i}
          />
        )
      }

      if (count > 2 && count <= 5) {
        bottom.push(
          <Image 
            source={{uri: image.images.thumbnail.url}} 
            style={styles.image}  
            key={i}
          />
        )
      }

      if (count === 5 ) {
        images.push(
          <View style={styles.slide} key={ 'slide' + i }>
            <View style={styles.topRow} key={ 'top' + i }>
              { top }
            </View>
            <View style={styles.bottomRow} key={ 'bottom' + i }>
              { bottom }
            </View>
          </View>
        )
        top = [];
        bottom = [];
        count = 0;
      } else {
        count++
      }
    })
    return images;

  }

  render() {
    if ((this.props.data).length === 0) {
      return null
    } else {
      return (
        <View style={styles.wrapper}>
          <Text style={styles.blackText}>{this.props.data.length} Instagram Photos</Text>
          <Swiper
            dot={<View style={{backgroundColor: 'rgba(255,180,0,.25)', width: 7, height: 7, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
            activeDot={<View style={{backgroundColor: '#FFB400', width: 7, height: 7, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
            paginationStyle={{
              top: -225, right: 40, left: null,
            }} loop>
            {this.slides()}
          </Swiper>
        </View>
      )
    }
  }
}