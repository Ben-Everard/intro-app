import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

import styles from './styles.js';
import images from '../../config/images.js';
import Button from '../Button';

export default class PendingRequests extends Component {
  constructor(props) {
    super(props);
  }

  _Accept(eventId, userId) {
    let currentId = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    let fieldPath = firebase.firestore.FieldPath;
    let pathCreated = new fieldPath('deny', eventId)
    let userRef = db.collection('users');
    let eventRef = db.collection('events');

    userRef.doc(userId).update({
      ['pending.' + eventId]: firebase.firestore.FieldValue.delete(),
      ['joined.' + eventId]: db.doc('events/' + eventId)
    }).catch(err => {
      console.log(err);
    })
    eventRef.doc(eventId).update({
      ['pending.' + userId]: firebase.firestore.FieldValue.delete(),
      ['members.' + userId]: db.doc('users/' + userId)
    }).catch(err => {
      console.log(err);
    })
  }

  _Decline(eventId, userId) {
    let currentId = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    let fieldPath = firebase.firestore.FieldPath;
    let pathCreated = new fieldPath('deny', eventId)
    let userRef = db.collection('users');
    let eventRef = db.collection('events');

    userRef.doc(userId).update({
      ['pending.' + eventId]: firebase.firestore.FieldValue.delete()
    }).catch(err => {
      console.log(err);
    })
    eventRef.doc(eventId).update({
      ['pending.' + userId]: firebase.firestore.FieldValue.delete(),
      ['deny.' + userId]: db.doc('users/' + userId)
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <View key={this.props.eventData.eventId} style={styles.eventRequest}>
        <View style={styles.profileImage}>
          <Image source={{url: this.props.eventData.profileImage}} style={styles.image}/>
          <Text style={styles.nameAge}>{this.props.eventData.shortName}, {this.props.eventData.age}</Text>
        </View>
        <View style={styles.acceptDecline}>
          <Text style={styles.eventName}>{this.props.eventData.eventName}</Text>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button text={'Decline'} style={styles.eachButton} onPress={()=> this._Decline(this.props.eventData.eventId, this.props.eventData.userId) } />
            </View>
            <View style={styles.button}>
              <Button text={'Accept'} style={styles.eachButton} onPress={()=> this._Accept(this.props.eventData.eventId, this.props.eventData.userId) } />
            </View>
          </View>
        </View>
      </View>
    )
  }
}