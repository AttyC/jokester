import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import JokeList from './components/JokeList'

export default function App() {

  const [jokesAPI, setJokesAPI] = useState([]);
  const [jokesLocalStorage, setJokesLocalStorage] = useState([]);

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
       <JokeList jokes={jokesAPI} refreshJokes={loadJokesFromAPI}/>
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
    fontSize: 26,
    fontWeight: 'bold'
  }
});
