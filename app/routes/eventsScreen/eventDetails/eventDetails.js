import React, { Component } from 'react'; 
import { Dimensions, Modal, Text, TouchableHighlight, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { tConvert, distanceFinder } from '../../../config/globalFunctions.js';

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
      created: false,
      modalOption: false,
      currentId: firebase.auth().currentUser.uid
    }
  }

  componentWillMount() {
    const {params} = this.props.navigation.state;

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
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    let currentId = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    let fieldPath = firebase.firestore.FieldPath;
    let pathCreated = new fieldPath('created', params.eventId)
    let pathMember = new fieldPath('joined', params.eventId)
    
    db.collection('users').where(pathCreated, '==', params.eventId).get().then(docs => {
      if ((docs._docs).length > 0) {
        this.setState({
          creator: true,
          member: true
        })
      }
    })
    .catch(err => {
      console.log(err);
    })

    db.collection('users').where(pathMember, '==', params.eventId).get().then(docs => {
      if ((docs._docs).length > 0) {
        this.setState({
          member: true,
          
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
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

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    let {height, width} = Dimensions.get('window');

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
      <TouchableHighlight onPress={()=>this._editEvent()}>
        <View style={styles.optionButtonBottom}>
          <Text style={styles.optionButtonsText}>Edit Event</Text>
        </View>
      </TouchableHighlight>
    const optionsCancel = 
    <TouchableHighlight onPress={()=>this._modalOption()}>
      <View style={styles.optionButtonCancel}>
        <Text style={styles.optionButtonsText}>Cancel</Text>
      </View>
    </TouchableHighlight>

    const backAction = NavigationActions.back({
      key: null
    })
    return (
      <View style={styles.container}>
        <StatusBar />
        <CustomNav onPress={()=>this.props.navigation.dispatch(backAction)} text={'BACK TO RESULTS'} />
        <View style={styles.event}>
          <View>
            <EventImage image={params.event.image} avatar={params.avatar}/>
            <Option onPress={()=>this._modalOption()}/>
          </View>
        </View>
        <View style={styles.fullDescription}>
          <Title title={params.event.event}/>
          <View style={styles.iconsMargin}>
            <EventIcons  style={styles.iconsMargin} people={this.state.spotsLeft} eventType={params.event.eventType} time={this.state.time} currentLat={params.states.currentLat} currentLong={params.states.currentLong} destinationLat={params.event.place.geo.lat} destinationLong={params.event.place.geo.long}/>
          </View>
          <Description  style={styles.description} description={params.event.description} />
        </View>
        <View style={styles.mapLocation}>
          <EventLocation name={params.event.place.name} address={params.event.place.formatedLocation} mapLocation={params.event.place.mapLocation}/>
          <View style={styles.button}>
            <Button text={'Request'} onPress={()=>this._requestJoin(params)}/>
          </View>
        </View>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
        >
          <View 
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
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
          transparent={true}
        >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            opacity: 1,
            height: height,
            width: width
          }}>
            <View style={{
              position: 'absolute',
              bottom: 0,
              
            }}>
              { optionsNonMember }
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
