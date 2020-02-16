import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRound, setGuessRound] = useState(0)
	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber)
		setGuessRound(0)
	}

	const gameOverHandler = numOfRound => {
		setGuessRound(numOfRound)
	}

	let content = <StartGameScreen onStartGame={startGameHandler} />

	if(userNumber && guessRound <= 0) {
		content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
	} else if(guessRound > 0) {
		content = <GameOverScreen />
	}

	return (
		<View style={styles.screen}>
			<Header title="Guess a Number" />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
