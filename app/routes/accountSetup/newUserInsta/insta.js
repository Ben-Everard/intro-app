import React, { Component } from 'react'; 
import { Image, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
// import InstagramLogin from 'react-native-instagram-login'

import images from '../../../config/images.js';
import styles from './styles.js';

//Components
import Button from '../../../components/Button/';
import StatusBar from '../../../components/StatusBar';
import UserHeader from '../../../components/User/UserHeader';

export default class newInsta extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  _stackReset(params, navigate) {
    const resetAction = this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
      key: null
    }));

    let db = firebase.firestore();
    let userRef = db.collection('users').doc(params.id);
    userRef.update({
      currectLocation: {
        city: this.state.city,
        state: this.state.state
      }
    })
    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount() {
    let lat, long
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        currentLat: position.coords.latitude,
        currentLong: position.coords.longitude,
        error: null,
      });
      lat = position.coords.latitude;
      long = position.coords.longitude
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=AIzaSyCO0WwmPRhnNs0iaObw3IRU3BDbEhre3Os')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          city: responseJson.results[0].address_components[3].long_name,
          state: responseJson.results[0].address_components[5].long_name
        })
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <UserHeader onPress={() => this._photoPicker} profilePic={params.user.profilePhoto}/>
        <View style={styles.lowerContainer}>
          <Text style={styles.welcomeName}>{params.user.name}, {params.user.age}</Text>
          <Text style={styles.cityState}>{this.state.city}, {this.state.state}</Text>
          <Text style={styles.description}>{params.description}</Text>
        </View>
        <View style={styles.button}>
          <Button onPress={() => this._stackReset(params, navigate)} text={'Alright lets make some intro\'s'}/>
        </View>
        <View style={styles.paginationDots}>
          <Image
            style={styles.pagination}
            source={images.accountSetup.paginationDots.fourDot} />
        </View>
      </View>
    )
  }
}