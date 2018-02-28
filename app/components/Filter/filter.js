import React, { Component } from 'react';
import {
  CheckBox,
  Picker,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles.js';
import images from '../../config/images.js'; 
// import Slider from '../Slider/slider.js';

export default class filter extends Component {

  render() {
    return (
      <View>
        <CheckBox />
      </View>
    )
  }
}