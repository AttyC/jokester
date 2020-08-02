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

     console.log('json', json)
    setJokesLocalStorage(json);
  } 

  useEffect(() => {
    loadJokesFromAPI();
    loadJokesFromLocalStorage();
  }, [])

  return (
    <View style={styles.container}>
       <Text><h1 className="text-center mb-5">Jokes list </h1></Text>

       <h1 className="text-center mb-5">Jokes API </h1>
       <JokeList jokes={jokesAPI} refreshJokes={loadJokesFromAPI} typeofJ={'API'}/>

       <h1 className="text-center mb-5">Jokes Local Storage </h1>
       <JokeList jokes={jokesLocalStorage} refreshJokes={loadJokesFromLocalStorage}/>

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
