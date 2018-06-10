// NPM files
import React, { Component } from 'react';
import { AsyncStorage, Modal, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';

// Local files
import styles from './styles.js';
import images from '../../../config/images.js';

// Components
import StatusBar from '../../../components/StatusBar/statusBar.js';
import CustomNav from '../../../components/CustomNav/customNav.js';
import EventImage from '../../../components/EventImage/eventImage.js';
import Avatars from '../../../components/Avatar/avatar.js';
import Title from '../../../components/EventTitle/eventTitle.js';
import Description from '../../../components/EventDescription/eventDescription.js';
import Option from '../../../components/EventOptionIcon/optionsIcon.js';
import EventIcons from '../../../components/EventIcons/eventIcons.js';
import EventLocation from '../../../components/EventLocation/eventLocation.js';
import Button from '../../../components/Button/button.js';

export default class eventSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  _submitEvent(params, navigate) {

    let db = firebase.firestore();
    let eventRef = db.collection('events');
    let currentId = firebase.auth().currentUser.uid;
    let eventId;

    eventRef.add({
      event: params.allStates.title,
      eventType: params.allStates.eventType,
      place: {
        name: params.allStates.name,
        address: {
          streetNumber: params.allStates.addressComponents.addressNumber ? params.allStates.addressComponents.addressNumber.short_name : null,
          streetName: params.allStates.addressComponents.addressStreet? params.allStates.addressComponents.addressStreet.short_name : null,
          city: params.allStates.addressComponents.addressCity ? params.allStates.addressComponents.addressCity.short_name : null,
          country:  params.allStates.addressComponents.addressCountry ? params.allStates.addressComponents.addressCountry.short_name : null,
          state: params.allStates.addressComponents.addressState ?  params.allStates.addressComponents.addressState.short_name : null,
          zipcode: params.allStates.addressComponents.addressZipcode ? params.allStates.addressComponents.addressZipcode.long_name : null,
        },
        geo: {
          long: params.allStates.addressGeo.long,
          lat: params.allStates.addressGeo.lat,
        },
        mapLocation: params.allStates.mapUrl,
        formatedLocation: params.allStates.formattedLocation,
      },
      image: this.state.imgSource,
      time: params.allStates.epochTime,
      openSpots: params.allStates.people,
      description: params.allStates.description,
    })
    .then(ref => {
      eventId = ref.id;
      eventRef.doc(eventId).set({
        id: eventId,
        members: {
          [currentId]: db.doc('users/' + currentId)
        }
      }, {merge: true});
      let userRef = db.collection('users').doc(currentId);
      let joined = {};
      let created = {};
      let userEvent = {
        joined: {
          [eventId]: db.doc('events/' + eventId),
        },
        created: {
          [eventId]: eventId
        }
      }
      userRef.set(userEvent, {merge:true});

      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })]
      }));
    })
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;

    let imageTotal = 0;
    let fileNames = params.allStates.eventType;

    if ((params.allStates.eventType).match(/^(Drinks|Game Time|Girls Night|Live Music)$/)) {
      imageTotal = 5;
      if (params.allStates.eventType === 'Game Time') {
        fileNames = 'games';
      }
      if (params.allStates.eventType === 'Girls Night') {
        fileNames = 'girls';
      }
      if (params.allStates.eventType === 'Live Music') {
        fileNames = 'music';
      }
    }

    if ((params.allStates.eventType).match(/^(Guys Night|Other)$/)) {
      imageTotal = 4;
      if (params.allStates.eventType === 'Guys Night') {
        fileNames = 'boys'
      }
    }

    if ((params.allStates.eventType).match(/^(Coffee|Outside)$/)) {
      imageTotal = 3;
      if (params.allStates.eventType === 'Outside') {
        fileNames = 'outdoor'
      }
    }

    fileNames = fileNames.toLowerCase();
    let random = (Math.floor(Math.random() * (imageTotal - 1 +1)) + 1).toString();
    let image = firebase.storage().ref('/' + params.allStates.eventType + '/' + fileNames + random + '.png' ).getDownloadURL()
      .then((url) => {
        this.setState({imgSource: url});
    });
    AsyncStorage.getItem('userDetails')
      .then((value) => {
        value = JSON.parse(value);
        this.setState({
          profilePic: [value.profilePhoto],
        })
      }) 
      .catch((error)=> {
        console.log(error)
      });
  }


  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

    return(
      <View style={styles.container}>
        <StatusBar />
        <CustomNav onPress={()=>navigate('HomeScreen')} text={'Back to Results'} />
        <View style={styles.event}>
          <EventImage image={this.state.imgSource} avatar={this.state.profilePic}/>
        </View>
        <View style={styles.fullDescription}>
          <Title style={styles.title} title={params.allStates.title}/>
          <View style={styles.iconsMargin}>
            <EventIcons style={styles.iconsMargin} time={params.allStates.eventTime} people={params.allStates.people} eventType={params.allStates.eventType} currentLat={params.allStates.currentLat} currentLong={params.allStates.currentLong} destinationLat={params.allStates.addressGeo.lat} destinationLong={params.allStates.addressGeo.long}/>
          </View>
          <Description style={styles.description} description={params.allStates.description} />
        </View>
        <View style={styles.mapLocation}>
          <EventLocation address={params.allStates.formattedLocation}/>
          <View style={styles.buttons}>
            <View style={styles.editButton}>
              <Button text={'Edit'} onPress={() => navigate('EventCalendar', {event: params.allStates})}/>
            </View>
            <View style={styles.submitButton}>
              <Button text={'Post'} onPress={() => this._submitEvent(params, navigate)}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}