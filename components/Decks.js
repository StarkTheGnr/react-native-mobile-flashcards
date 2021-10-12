import React, { Component } from "react";
import { FlatList, Text, TextInput } from "react-native";
import { connect } from 'react-redux'
import DeckCard from "./DeckCard"

class Decks extends Component
{
	renderItem = ({ item }) => {
		console.log("KEY", item)
		return <DeckCard key={item} deckKey={item} navigation={this.props.navigation} />
	}

	render()
	{
		if(!this.props.decks)
			return (<Text>Loading</Text>)

		return ( <FlatList data={Object.keys(this.props.decks)} renderItem={this.renderItem} keyExtractor={(item) => item} />)
	}
}

function mapStateToProps({ decks })
{
	console.log(decks)
	return {
		decks: decks
	}
}

export default connect(mapStateToProps)(Decks)