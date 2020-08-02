import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function JokeCard({joke}) {

  return (
    <div className="card">
      <div className="card-body">
        <p>{joke.setup}</p>
        <p>{joke.punchline}</p>
      </div>
    </div>
  )
}
