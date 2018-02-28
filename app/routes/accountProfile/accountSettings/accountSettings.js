import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import styles from './styles.js';
import images from '../../../config/images.js';
import StatusBar from '../../../components/StatusBar/';
import Button from '../../../components/Button/'

export default class accountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [ 22, 30 ]
    }
  }

  render() {
    const backAction = NavigationActions.back({
      key: null
    })
    const { navigate } = this.props.navigation;
    return(
      <ScrollView style={styles.container}>
        <StatusBar />
        <View style={styles.ageSection}>
          <View style={styles.ageSettings}>
            <Text>Age</Text>
            <Text>{this.state.values[0]} - {this.state.values[1]}</Text>
          </View>
          <View style={styles.ageSlider}>
            <MultiSlider
              values={[this.state.values[0], this.state.values[1]]}
              sliderLength={309}
              onValuesChange={this.multiSliderValuesChange}
              min={18}
              max={50}
              step={1} 
              // customMarker={images.slider.handle}
              // trackStyle={images.slider.progress}
            />
          </View>
        </View>
        <View style={styles.settingRow}>
          <Text>Push notifications</Text>
          <Switch />
        </View>
        <View style={styles.settingRow}>
          <Text>App sounds / Vibration</Text>
          <Switch />
        </View>
        <View style={styles.settingRow}>
          <Text>Auto add to calendar</Text>
          <Switch />
        </View>
        <TouchableOpacity onPress={()=>navigate('AccountLegal', {text: 'Terms of Service', tos: true})}>
          <View style={styles.settingRow}>
            <Text>Terms of Service</Text>
            <Image />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigate('AccountLegal', {text: 'Privacy Policy'})}>
          <View style={styles.settingRow}>
            <Text>Privacy Policy</Text>
            <Image />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.settingRow}>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.button}>
          <Button text={'Back'} onPress={()=>this.props.navigation.dispatch(backAction)}/>
        </View>
      </ScrollView>
    )
  }
}