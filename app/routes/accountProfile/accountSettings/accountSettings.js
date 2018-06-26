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

import firebase from 'react-native-firebase';

import styles from './styles.js';
import images from '../../../config/images.js';
import StatusBar from '../../../components/StatusBar/';
import Button from '../../../components/Button/'

export default class accountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageRange: [ 22, 30 ],
      sound: false,
      notifications: true,
      calendar: false
    }
  }

  changeSound = (value) => {
    this.setState({sound: value});
  }

  changeNotifications = (value) => {
    this.setState({notifications: value});
    
  }

  changeCalendar = (value) => {
    this.setState({calendar: value});
    
  }

  multiSliderValuesChange = (value) => {
    this.setState({ageRange: value});
    
  }

  saveSettings() {
    let db = firebase.firestore();
    let currentId = firebase.auth().currentUser.uid;
    db.collection('users').doc(currentId).update({
      settings: this.state
    })
  }



  render() {
    this.saveSettings()
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
            <Text>{this.state.ageRange[0]} - {this.state.ageRange[1]}</Text>
          </View>
          <View style={styles.ageSlider}>
            <MultiSlider
              values={[this.state.ageRange[0], this.state.ageRange[1]]}
              sliderLength={309}
              onValuesChangeFinish={this.multiSliderValuesChange}
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
          <Switch 
            value={this.state.notifications}
            onValueChange={this.changeNotifications}
          />
        </View>
        <View style={styles.settingRow}>
          <Text>App sounds / Vibration</Text>
          <Switch 
            value={this.state.sound}
            onValueChange={this.changeSound}
          />
        </View>
        <View style={styles.settingRow}>
          <Text>Auto add to calendar</Text>
          <Switch 
            value={this.state.calendar}
            onValueChange={this.changeCalendar}
          />
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