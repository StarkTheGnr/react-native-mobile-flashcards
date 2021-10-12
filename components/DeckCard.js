import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { connect } from 'react-redux'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

class DeckCard extends Component
{
	state = {
		scale: new Animated.Value(1)
	}

	handlePress = (e) => {
		const { scale } = this.state

		Animated.sequence([
			Animated.timing(scale, {duration: 100, toValue: 1.3, useNativeDriver: true}),
			Animated.spring(scale, {toValue: 1, friction: 4, useNativeDriver: true})
		]).start()

		this.props.navigation.navigate("DeckInfo", { deckKey: this.props.deck.key })
	}

	render()
	{
		const { scale } = this.state

		return (
			<AnimatedTouchable style={[styles.mainview, {transform: [{scale: scale}]}]} onPress={this.handlePress}>
				<Text style={styles.decktext}>{this.props.deck.title}</Text>
				<Text>{this.props.deck.questions.length} cards</Text>
			</AnimatedTouchable>
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