import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import JokeCard from './JokeCard';

export default function JokeList({jokes, refreshJokes}) {
  console.log('toj', jokes)

  if (typeof jokes == 'string') {
    jokes = JSON.parse(jokes)
  }
  return (
    <View style={styles.container}>
       <Text>Welcome to the Jokester App LIST!</Text>
      <StatusBar style="auto" />
   
      {jokes && jokes.map(joke => <JokeCard 
          joke={joke}
          key={joke.id}
          refreshJokes={refreshJokes}
          />)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

