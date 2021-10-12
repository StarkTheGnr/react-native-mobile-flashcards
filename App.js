import React, { Component } from "react";
import { View, Text } from "react-native";
import { Provider } from "react-redux"
import { createStore } from 'redux'
import Constants from "expo-constants"
import middleware from "./middleware"
import reducer from "./reducers"
import { getDecks, deleteAll, setLocalNotification } from "./utils/api"
import { getDecksAction } from "./actions/decks"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Home from "./components/Home"
import DeckCard from "./components/DeckCard"
import Decks from "./components/Decks"
import AddDeck from "./components/AddDeck"



const Tabs = createBottomTabNavigator()

class App extends Component 
{
  store = createStore(reducer, middleware)

  componentDidMount()
  {
    getDecks().then((results) => {
      this.store.dispatch(getDecksAction(results))
    })

    setLocalNotification()
  }

  render()
  {
    return (
      <Provider store={this.store}>
        <NavigationContainer >
          <Tabs.Navigator>
            <Tabs.Screen name="Decks" component={Home} options={{tabBarIcon: () => (<MaterialCommunityIcons style={{marginBottom: -10}} name="cards" size={24} color="black" />)}} />
            <Tabs.Screen name="Add Deck" component={AddDeck} options={{tabBarIcon: () => (<MaterialCommunityIcons style={{marginBottom: -10}} name="credit-card-plus" size={24} color="black" />)}}/>
          </Tabs.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}


export default App