import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Swiper from 'react-native-swiper';
import firebase from 'react-native-firebase';

import styles from './styles.js'

import StatusBar from '../../../components/StatusBar/statusBar.js';
import CustomNav from '../../../components/CustomNav/customNav.js';
import Option from '../../../components/EventOptionIcon/optionsIcon.js';
import EventImage from '../../../components/EventImage/eventImage.js';
import Instagram from '../../../components/Instagram';



export default class MemberProfiles extends Component {

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      slides: null,
      avatar: params.avatar
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    let image = params.avatar[0];
    params.avatar[0] = {
      image,
      active: true
    }
    this.setState({
      avatar: params.avatar
    })
    this.slides(params);
  }

  indexFinder = index => {
    const { params } = this.props.navigation.state;
    (params.avatar).map(function(data, index) {
      let imageURL = data
      if (data.image) {
        imageURL = data.image;
      }
      params.avatar[index] = imageURL;
    })
    let image = params.avatar[index];
    params.avatar[index] = {
      image,
      active: true
    }
    this.setState({
      avatar: params.avatar
    })
  }

  slides(data) {
    let slides = []
    let db = firebase.firestore();
    let ref = db.collection('users');
    let self = this;
    let members = data.event.members;

    Object.keys(members).forEach(function(key) {
      ref.doc(key).get().then(docs => {
        let userData = docs.data();
        slides.push(
          <View key={key}>
            <ScrollView style={styles.scrollHeight}>
              <View style={styles.lowerContainer}>
                <Text style={styles.welcomeName}>{userData.name}, {userData.age}</Text>
                { userData.currectLocation ? ( 
                <Text style={styles.cityState}>{userData.currectLocation.city}, {userData.currectLocation.state}</Text>
                ) : ( null) }
                <Text style={styles.description}>{userData.description}</Text>
              </View>
            </ScrollView>
          </View>
        )
        self.setState({
          slides
        })
      })
      .catch(err => {
        console.log(err);
      })
      
    })
  }



  render() {
    const { params } = this.props.navigation.state;
    const backAction = NavigationActions.back({
      key: null
    })
    if (this.state.slides === null ) {
      return (
        null
      )
    } else {
      return ( 
        <View style={styles.container}>
          <StatusBar />
          <CustomNav onPress={()=>this.props.navigation.dispatch(backAction)} text={'BACK TO EVENT DETAILS'} left={true}/>
          <View style={styles.event}>
            <EventImage image={params.event.image} avatar={this.state.avatar} event={params.event} />
            <Option onPress={()=>this._modalOption()}/>
          </View>
          <Swiper
            loop = {false}
            onIndexChanged = {this.indexFinder}>
            {this.state.slides}
          </Swiper>
        </View>
      )
    }
  }
}