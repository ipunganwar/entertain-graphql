import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class HomeScreen extends Component {
  render() {
    const { resep } = this.props.data
    console.log(resep)
    return (
      <FlatList
        data = {resep}
        keyExtractor = {(item, index) => index}
        renderItem = { ({item}) => 
        <View>
          <Text>{item.title}</Text>
          <Text>{item.bahan}</Text>
        </View>
      }
      />
    )
  }
}

export default graphql(gql`
  query{
    resep {
      title
      bahan
    }
  } 
`)(HomeScreen)