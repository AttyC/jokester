import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import JokeList from './components/JokeList'

export default function App() {

  const [jokesAPI, setJokesAPI] = useState([]);
  const [jokesLocalStorage, setJokesLocalStorage] = useState([]);

  const refreshJokes = () => {
    loadJokesFromAPI();
    loadJokesFromLocalStorage();
  }

  const loadJokesFromAPI = async() => {

    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_ten');
      const jokesAPI = await res.json();
      setJokesAPI(jokesAPI);

    } catch(err){
      console.error(err); 
    }
  }

  const loadJokesFromLocalStorage = () => { 
    const json = window.localStorage.getItem(process.env.LOCALSTORAGE_KEY)
    setJokesLocalStorage(json);
  } 

  useEffect(() => {
    loadJokesFromAPI();
    loadJokesFromLocalStorage();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to Jokester!</Text>
      <Text style={styles.subheaderText}>Here are your random jokes!</Text>
      <View style={styles.aside}>
        <Text>To see more random jokes, press this button:</Text>
        <TouchableOpacity onPress={refreshJokes} style={styles.button}>
          <Text style={styles.TextStyle}>Load new jokes </Text>
        </TouchableOpacity>
      </View>

      <JokeList jokes={jokesAPI} refreshJokes={loadJokesFromAPI}/>
      <Text style={styles.subheaderText}>And here are your saved jokes!</Text>
      <JokeList jokes={jokesLocalStorage} refreshJokes={loadJokesFromLocalStorage}/>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  subheaderText: {
    color: '#3632bf',
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20
  },
  aside: {
    fontSize: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'lightgrey',
    padding: 5,
    border: '1px solid lightgrey',
    borderRadius: 5,
    margin: 10,
    color: '#000',
    width: '7em',
    textAlign: 'center'
  }
});
