import React, { Component } from 'react'; 
import { Image, Modal, ScrollView, Text, TouchableOpacity, View, WebView,  } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import qs from 'qs';
import Swiper from 'react-native-swiper';

import images from '../../../config/images.js';
import styles from './styles.js';

//Components
import Button from '../../../components/Button/';
import StatusBar from '../../../components/StatusBar';
import UserHeader from '../../../components/User/UserHeader';
import Instagram from '../../../components/Instagram';

const patchPostMessageJsCode = `(${String(function () {
  var originalPostMessage = window.postMessage
  var patchedPostMessage = function (message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer)
  }
  patchedPostMessage.toString = function () {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
  }
  window.postMessage = patchedPostMessage
})})();`

export default class newInsta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      accessToken: null,
      instagramData: [],

    }
  }
  _stackReset(params, navigate) {
    let db = firebase.firestore();
    let currentUser = firebase.auth().currentUser.uid;
    let userRef = db.collection('users').doc(currentUser);
    userRef.update({
      currectLocation: {
        city: this.state.city,
        state: this.state.state
      },
      instagramSet: this.state.accessToken !== null ? true : false,
      instagramToken: this.state.accessToken,
      profileSet: true
    });

    const resetAction = this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
      key: null
    }));
    this.props.navigation.dispatch(resetAction);
  }

  show () {
    this.setState({ 
      modalVisible: true 
    })
  }

  hide () {
    this.setState({ 
      modalVisible: false 
    })
  }

  _onMessage (reactMessage) {
    try {
      const json = JSON.parse(reactMessage.nativeEvent.data)
      if (json && json.error_type) {
        this.hide()
        this.props.onLoginFailure(json)
      }
    } catch (err) { }
  }

  _onNavigationStateChange (webViewState) {
    const { url } = webViewState
    if (url && url.startsWith('http://localhost')) {
      const match = url.match(/(#|\?)(.*)/)
      const results = qs.parse(match[2])
      this.hide()
      if (results.access_token) {
        this.setState({
          accessToken: results.access_token
        })
      } else {
        alert('Something went wrong ' + results.error);
      }
    }
  }

  fetchData = async() => {
    const response = await fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + this.state.accessToken);
    const json = await response.json();
    this.setState({
      instagramData: json.data
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.accessToken !== prevState.accessToken) {
      this.fetchData();
    }
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
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=AIzaSyCO0WwmPRhnNs0iaObw3IRU3BDbEhre3Os')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            city: responseJson.results[0].address_components[3].long_name,
            state: responseJson.results[0].address_components[5].long_name
          })
      });
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <UserHeader onPress={() => this._photoPicker} profilePic={params.user.profilePhoto}/>
        <ScrollView style={styles.scrollHeight}>
          <View style={styles.lowerContainer}>
            <Text style={styles.welcomeName}>{params.user.name}, {params.user.age}</Text>
            <Text style={styles.cityState}>{this.state.city}, {this.state.state}</Text>
            <Text style={styles.description}>{params.description}</Text>
          </View>
          <View style={styles.linking}> 
            <Text style={styles.grayText}>Link your crap</Text>
            <TouchableOpacity onPress={()=>this.show()}>
              <Text style={styles.greenText}>Instagram</Text>
            </TouchableOpacity>
          </View>
          <Instagram data={this.state.instagramData} style={styles.instagram}/>
        </ScrollView>
        <View style={styles.fixedButton}>
          <View style={styles.button}>
            <Button onPress={() => this._stackReset(params, navigate)} text={'Alright lets make some intro\'s'}/>
          </View>
          <View style={styles.paginationDots}>
            <Image
              style={styles.pagination}
              source={images.accountSetup.paginationDots.fourDot} />
          </View>
        </View>
        <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={this.hide.bind(this)}
          >
            <WebView
              source={{ uri: 'https://www.instagram.com/oauth/authorize/?client_id=1d7c082888914b67bb9aeb82a5b08963&redirect_uri=http://localhost&response_type=token'}}
              onMessage={this._onMessage.bind(this)}
              onError={this._onNavigationStateChange.bind(this)}
              style={{marginTop: 20}}
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              injectedJavaScript={patchPostMessageJsCode}
              ref={(webView) => { this.webView = webView }}
            />
          </Modal>
        </View>
      </View>
    )
  }
}

