import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import JokeList from './components/JokeList'

export default function App() {

  const [jokes, setJokes] = useState([]);

  const loadJokes = async() => {

    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_ten');
      const jokes = await res.json();
      setJokes(jokes);
    } catch(err){
      console.error(err); 
    }

  }

  useEffect(() => {
    loadJokes();
  }, [])

  console.log('jokes', jokes)
  return (
    <View style={styles.container}>
       <Text>Welcome to the Jokester App!</Text>
       <JokeList jokes={jokes} />
      <StatusBar style="auto" />

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
