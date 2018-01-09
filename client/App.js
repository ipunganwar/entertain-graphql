/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StackNavigator } from 'react-navigation'
import HomeScreen from './react/src/HomeScreen'
import gql from 'graphql-tag';


const client = new ApolloClient({
  link: new HttpLink({uri: 'http://192.168.58.1:4000/graphql'}),
  cache: new InMemoryCache()
});

// client.query({ query: gql`{resep}` }).then(console.log);


const MainMenu = StackNavigator({
  Home: { screen: HomeScreen }
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <HomeScreen/>
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
