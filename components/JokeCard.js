import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Image,  StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity} from 'react-native';
import like from './smile2x.png'; 
import dislike from './frown2x.png'; 

export default function JokeCard({joke, refreshJokes}) {

  let likeImage = require('./smile2x.png')
  let dislikeImage = require('./frown2x.png')

  const likeJoke = () => {

    console.log('pressed like')
    
    let existingJokes = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE_KEY)) || [];

    let newJoke = {
      'type': joke.type,
      'setup': joke.setup,
      'punchline': joke.punchline,
      'like': true,
      'dislike': false
    }

    existingJokes.push(newJoke);

    localStorage.setItem(process.env.LOCALSTORAGE_KEY, JSON.stringify(existingJokes));
  }

  const dislikeJoke = () => {

    let existingJokes = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE_KEY)) || [];

    let newJoke = {
      'type': joke.type,
      'setup': joke.setup,
      'punchline': joke.punchline,
      'like': false,
      'dislike': true
    }

    existingJokes.push(newJoke);

    localStorage.setItem(process.env.LOCALSTORAGE_KEY, JSON.stringify(existingJokes));

  }

  return (
    <View style={styles.container}>
      <Text style={styles.card}>
        <View>
          <Text style={styles.setup}>{joke.setup}</Text>
          <Text style={styles.punchline}>{joke.punchline}</Text>
        </View>
        <TouchableOpacity style={styles.ImageIconStyle} activeOpacity={1} onPress={likeJoke}>
          <Image
          source={likeImage}
          style={[(joke.like) ? styles.hasLiked : styles.defaultIcon]}
          />
          <Text style={styles.TextStyle}> Like </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ImageIconStyle} activeOpacity={1} onPress={dislikeJoke}>
            <Image
            source={dislikeImage}
            style={[(joke.dislike) ? styles.hasDisliked : styles.defaultIcon]}
            />
            <Text style={styles.TextStyle}> Dislike </Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    backgroundColor: '#FFE6E2',
    marginBottom: 20,
    padding: 20,
    borderRadius: 25,
    fontSize: '16px'
  }, 
  setup: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: 10
  },
  punchline: {
    display: 'block',
    paddingBottom: 20
  },
  defaultIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: 40,
    width: 50,
    borderRadius: 5,
    margin: 5,
  },
  hasLiked: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7DE4A6',
    height: 40,
    width: 50,
    borderRadius: 5,
    margin: 5,
  },
  hasDisliked: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FA8775',
    height: 40,
    width: 50,
    borderRadius: 5,
    margin: 5,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  ImageIconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 40,
    width: 100,
    borderRadius: 5,
    margin: 5
  },
  TextStyle: {
    color: '#000',
    marginBottom: 4,
    marginRight: 20,
  },
});
