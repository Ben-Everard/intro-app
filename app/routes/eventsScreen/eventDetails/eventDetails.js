import React, { Component } from 'react'; 
import { Dimensions, Linking, Modal, Platform, Text, TouchableHighlight, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { tConvert, distanceFinder } from '../../../config/globalFunctions.js';
import RNGooglePlaces from 'react-native-google-places';

import images from '../../../config/images.js';
import styles from './styles.js';
import firebase from 'react-native-firebase';


// Custom Components
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

export default class eventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotsLeft: 0,
      modalVisible: false,
      member: false,
      creator: false,
      modalOption: false,
      currentId: firebase.auth().currentUser.uid
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    let currentId = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    let fieldPath = firebase.firestore.FieldPath;
    let pathCreated = new fieldPath('created', params.eventId);
    let pathMember = new fieldPath('joined', params.eventId);

    //Open spots
    let totalSpots = params.event.openSpots;
    let spotsTaken = (params.avatar).length;
    let spotsLeft = totalSpots - spotsTaken;

    //Time cnverter
    var date = new Date(params.event.time*1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();

    this.setState({
      spotsLeft: spotsLeft,
      time: tConvert(hours + ':' + minutes),
    });


    db.collection('users').doc(currentId).get().then(docs => {
      let data = docs._data;
      if ((data.created).hasOwnProperty(params.eventId)) {
        this.setState({
          creator: true
        })
      } else if ((data.joined).hasOwnProperty(params.eventId)) {
        console.log('Should not be here');
        this.setState({
          member: true
        })
      } else {
        this.setState({
          requestButton: true
        })
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  _requestJoin(params) {
    let db       = firebase.firestore();
    let eventRef = db.collection('events').doc(params.eventId);
    let userRef  = db.collection('users').doc(this.state.currentId);

    let pendingEvent = {
      pending: {
        [this.state.currentId]: db.doc('users/' + this.state.currentId)
      }
    }

    let pendingUser = {
      pending: {
        [params.eventId]: db.doc('events/' + params.eventId)
      }
    }

    eventRef.set(pendingEvent, {merge:true});
    userRef.set(pendingUser, {merge:true});

    this.setState({
      modalVisible: true
    });
  }

  _viewModal(backAction) {
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
    this.props.navigation.dispatch(backAction)
  }

  _modalOption() {
    this.setState({
      modalOption: !this.state.modalOption,
    })
  }

  _report() {
    console.log('Report Clicked');
    this.setState({
      modalOption: false,
    })
  }

  _leaveEvent() {
    console.log('Leave Event Clicked');
    this.setState({
      modalOption: false,
    })
  }

  _editEvent() {
    console.log('Edit Event Clicked');
    this.setState({
      modalOption: false,
    })
  }

  _maps(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
    
  }

  onGetPlaceByIDPress = (id) => {
    RNGooglePlaces.lookUpPlaceByID(id)
    .then((results) => {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${results.latitude},${results.longitude}`;
      const label = 'Custom Label';
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      this._maps(url);
    })
    .catch((error) => console.log(error.message));
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    let {height, width} = Dimensions.get('window');

    (params.avatar).map(function(data, index) {
      let imageURL = data
      if (data.image) {
        imageURL = data.image;
      }
      params.avatar[index] = imageURL;
    })

    const optionsNonMember = 
      <TouchableHighlight onPress={()=>this._report()}>
        <View style={this.state.member && this.state.creator ? styles.optionButtonReport : styles.optionButtonReportOnly}>
          <Text style={styles.optionButtonsText}>Report</Text>
        </View>
      </TouchableHighlight>
    const optionsMember = 
      <TouchableHighlight onPress={()=>this._leaveEvent()}>
        <View style={this.state.member && !this.state.creator ? styles.optionButtonBottom : styles.optionButton}>
          <Text style={styles.optionButtonsText}>Leave Event</Text>
        </View>
      </TouchableHighlight>
    const optionscreator = 
      <View>
        <TouchableHighlight onPress={()=>this._editEvent()}>
          <View style={styles.optionButtonBottom}>
            <Text style={styles.optionButtonsText}>Edit Event</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>this._editEvent()}>
          <View style={styles.optionButtonBottom}>
            <Text style={styles.optionButtonsText}>Remove Event</Text>
          </View>
        </TouchableHighlight>
      </View>
    const optionsCancel = 
    <TouchableHighlight onPress={()=>this._modalOption()}>
      <View style={styles.optionButtonCancel}>
        <Text style={styles.optionButtonsText}>Cancel</Text>
      </View>
    </TouchableHighlight>

    const backAction = NavigationActions.back({
      key: null
    });

    return (
      <View style={styles.container}>
        <StatusBar />
        <CustomNav onPress={()=>this.props.navigation.dispatch(backAction)} text={'BACK TO RESULTS'} left={true}/>
        <View style={styles.event}>
          <View>
            <EventImage image={params.event.image} avatar={params.avatar} event={params.event} clickable={true} height={96} onPress={() => this.props.navigation.navigate('MemberDetails', {avatar: params.avatar, event: params.event})}/>
            <Option onPress={()=>this._modalOption()}/>
          </View>
        </View>
        <View style={styles.fullDescription}>
          <Title title={params.event.event} size={true}/>
          <View style={styles.iconsMargin}>
            <EventIcons style={styles.iconsMargin} people={this.state.spotsLeft} eventType={params.event.eventType} time={this.state.time} currentLat={params.states.currentLat} currentLong={params.states.currentLong} destinationLat={params.event.place.geo.lat} destinationLong={params.event.place.geo.long}/>
          </View>
          <Description style={styles.description} description={params.event.description} />
        </View>
        <View style={styles.mapLocation}>
          <EventLocation name={params.event.place.name} address={params.event.place.formatedLocation} onPress={() => this.onGetPlaceByIDPress(params.event.place.placeId)}/>
          { this.state.requestButton &&
            <View style={styles.button}>
              <Button text={'Request'} onPress={()=>this._requestJoin(params)}/>
            </View> 
          }
        </View>
        <Modal
          visible={this.state.modalVisible}
          transparent={true} >
          <View 
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)' }} >
            <View style={styles.requestModal}>
              <Text>Sent!</Text>
              <Text>You will get an alert once you have been accepted!</Text>
              <View style={styles.requestButton}>
                <Button text={'Keep Browsing'}  onPress={()=>this._viewModal(backAction)} />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.modalOption}
          transparent={true} >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            opacity: 1,
            height: height,
            width: width }} >
            <View style={{
              position: 'absolute',
              bottom: 0 }} >
              { this.state.member ? null : optionsNonMember }
              { this.state.member ? optionsMember : null }
              { this.state.creator ? optionscreator : null }
              { optionsCancel }
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
