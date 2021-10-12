import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'

class DeckCard extends Component
{
	handlePress = (e) => {
		this.props.navigation.navigate("DeckInfo", { deckKey: this.props.deck.key })
	}

	render()
	{
		return (
			<TouchableOpacity style={styles.mainview} onPress={this.handlePress}>
				<Text style={styles.decktext}>{this.props.deck.title}</Text>
				<Text>{this.props.deck.questions.length} cards</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	mainview: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		marginBottom: 10,
		backgroundColor: "lightgrey",
		padding: 45
	},
	decktext: {
		fontSize: 28,
		marginBottom: 2
	}
})

function mapStateToProps({ decks }, { deckKey })
{
	console.log("FFS", decks, deckKey)

	return {
		deck: decks[deckKey]
	}
}

export default connect(mapStateToProps)(DeckCard)