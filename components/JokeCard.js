import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function JokeCard({joke, refreshJokes}) {

  const likeJoke = () => {

    let existingJokes = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE_KEY)) || [];

    let newJoke = {
      'type': joke.type,
      'setup': joke.setup,
      'punchline': joke.punchline,
      'liked': true,
      'dislike': false
    }

    existingJokes.push(newJoke);

    localStorage.setItem(process.env.LOCALSTORAGE_KEY, JSON.stringify(existingJokes));
    refreshJokes();

  }

  return (
    <div className="card">
      <div className="card-body">
        <p>{joke.setup}</p>
        <p>{joke.punchline}</p>

        <p>{joke.liked}</p>
      </div>

      <div className="card-footer">
        <button className="btn btn-warning mr-2" onClick={likeJoke}>Like</button>
        {/* <button className="btn btn-danger" onClick={dislikeJoke}>Dislike</button> */}
      </div>
    </div>
  )
}
