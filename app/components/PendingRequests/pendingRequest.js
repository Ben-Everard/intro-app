import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles.js';
import images from '../../config/images.js';
import Button from '../Button';

export default class PendingRequests extends Component {
  render() {
    return (
      <View style={styles.requestContainer}>
        <Text style={styles.title}> PENDING REQUEST </Text>
        <View style={styles.eventRequest}>
          <View style={styles.profileImage}>
            <Image source={images.temp} />
            <Text style={styles.nameAge}>Brian, 30</Text>
          </View>
          <View style={styles.acceptDecline}>
            <Text style={styles.eventName}>Brunch and mimosas</Text>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button text={'Decline'} style={styles.eachButton}/>
              </View>
              <View style={styles.button}>
                <Button text={'Accept'} style={styles.eachButton}/>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.eventRequest}>
          <View style={styles.profileImage}>
            <Image source={images.temp} />
            <Text style={styles.nameAge}>Brian, 30</Text>
          </View>
          <View style={styles.acceptDecline}>
            <Text style={styles.eventName}>Brunch and mimosas</Text>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button text={'Decline'} style={styles.eachButton}/>
              </View>
              <View style={styles.button}>
                <Button text={'Accept'} style={styles.eachButton}/>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.viewMore}> View 3 More Requests</Text>
      </View>
    )
  }
}