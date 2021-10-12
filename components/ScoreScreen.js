import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

class ScoreScreen extends Component
{
	restartQuiz = (e) => {
		this.props.navigation.pop(2)	
		this.props.navigation.navigate("Quiz", {
			deck: this.props.route.params.deck
		})	
	}

	backToDeck = (e) => {
		this.props.navigation.pop(2)
	}

	render()
	{
		console.log("SCORE", this.props.route.params)
		if(!this.props.route.params)
			return <Text>SCORE FKN SCREEN</Text>
		const { deck, correct, incorrect } = this.props.route.params
		const diff = correct - incorrect

		return (
			<View style={styles.center}>
				<Text style={{fontSize: 36, textAlign: "center", marginTop: 20}}>{deck.title}</Text>
				<Text style={{fontSize: 18, textAlign: "center"}}>{deck.questions.length} cards</Text>
				<View style={[styles.box, {backgroundColor: (diff >= 0) ? "green" : "darkred"}]}>
					<Text style={[styles.scoretxt, {fontSize: 52, textAlign: "center", marginTop: 0}]}>{(correct/(correct+incorrect) * 100).toFixed(1)}%</Text>
					<View style={{flexDirection: "column"}}>
						<Text style={styles.scoretxt}>Correct: {correct}</Text>
						<Text style={styles.scoretxt}>Incorrect: {incorrect}</Text>
					</View>
				</View>
				 <TouchableOpacity onPress={this.restartQuiz} style={[styles.createbtn, {marginTop: 80}]}>
				 	<Text style={{color: "white"}}>Restart Quiz</Text>
				 </TouchableOpacity>
				 <TouchableOpacity onPress={this.backToDeck} style={[styles.createbtn, {backgroundColor: "green"}]}>
				 	<Text style={{color: "white"}}>Back to Deck</Text>
				 </TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 5
	},
	box: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		flex: 0.7,
		alignSelf: "stretch",
		margin: 10

	},
	input: {
		backgroundColor: "white",
		alignSelf: "stretch",
		margin: 20,
		borderRadius: 5,
		elevation: 5,
		padding: 5,
		marginTop: 40
	},
	createbtn: {
		backgroundColor: "#261d66",
		padding: 20,
		marginTop: 20,
		width: 150,
		alignItems: "center"
	},
	scoretxt: {
		color: "white",
		fontSize: 18
	}
})

export default ScoreScreen