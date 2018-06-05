import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles.js';
import images from '../../config/images';

export default class AllChats extends Component {
  render() {
    return (
      <View style={styles.allChatContainer}>
        <Text style={styles.chatTitle}>CURRENT CHATS</Text>
        <View style={styles.chatContainer}>
          <View style={styles.images}>
            <Image source={images.temp} />
          </View>
          <View style={styles.eventChat}>
            <Text style={styles.eventName}>Brunch and mimosas</Text>
            <Text style={styles.chat}>Casey: Can't wait for Brunch! See...</Text>
          </View>
        </View>
        <View style={styles.chatContainer}>
          <View style={styles.images}>
            <Image source={images.temp} />
          </View>
          <View style={styles.eventChat}>
            <Text style={styles.eventName}>Brunch and mimosas</Text>
            <Text style={styles.chat}>Casey: Can't wait for Brunch! See...</Text>
          </View>
        </View>
        <View style={styles.chatContainer}>
          <View style={styles.images}>
            <Image source={images.temp} />
          </View>
          <View style={styles.eventChat}>
            <Text style={styles.eventName}>Brunch and mimosas</Text>
            <Text style={styles.chat}>Casey: Can't wait for Brunch! See...</Text>
          </View>
        </View>
      </View>
    )
  }
}