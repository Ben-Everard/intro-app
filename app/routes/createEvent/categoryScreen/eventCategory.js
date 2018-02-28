'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground, 
  View 
} from 'react-native';
import { tConvert } from '../../../config/globalFunctions.js';

import styles from './styles.js';
import images from '../../../config/images.js';

//Components
import HeaderTop from '../../../components/CreateEvent/HeaderTop/';
import HeaderMiddle from '../../../components/CreateEvent/HeaderMiddle/';
import EventCategories from '../../../components/CreateEvent/EventCategories';
import Button from '../../../components/Button/'

export default class eventCategory extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.state = {
      people: params.people,
      time: params.time,
      eventTime: params.hours,
    };
  }

  eventType(type, name, image) {
    this.setState({
      eventType: type,
      typeName: name,
      eventIcon: image,
      gradient: type
    })
  }

  componentWillMount() {
    var dateTime = new Date(0)
    dateTime.setUTCSeconds(this.state.time);
    var year = dateTime.getUTCFullYear();
    var date = dateTime.getUTCDate();
    var month = dateTime.getUTCMonth() + 1;
    this.setState({
      date: year + '/' + month + '/' + date,
    });
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params && params.event && params.event.eventType) {
      this.setState({
        gradient: params.event.eventType,
        date: params.event.date,
        eventIcon: params.event.icon,
        eventType: params.event.eventType,
        eventName: params.event.eventName
      })
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    let {height, width} = Dimensions.get('window');

    return(
      <View style={styles.container}>
        <ImageBackground
          source={images.createEvent.background.stepTwo}
          style={{
            width: width,
            height: 190
          }}
        >
          <HeaderTop text={'Pick some more crap'}/>
          <HeaderMiddle people={this.state.people} time={this.state.eventTime} date={this.state.date} />
        </ImageBackground>
        <EventCategories eventType={this.eventType.bind(this)} gradient={this.state.gradient}/>
        <View style={styles.button}>
          <Button text={'Next'} onPress={ ()=> navigate('CreateDetails', {epochTime: this.state.time, date: this.state.date, eventTime: this.state.eventTime, eventType: this.state.eventType, people: this.state.people, typeName: this.state.typeName, eventIcon: this.state.eventIcon, selected: params.selected, event: params.event })}/>
        </View>
      </View>
    )
  }
}