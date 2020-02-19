import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
	Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	})
}

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRound, setGuessRound] = useState(0)
	const [dataLoaded, setDataLoaded] = useState(false)

	if(!dataLoaded) {
		return <AppLoading 
			startAsync={fetchFonts} 
			onFinish={() => setDataLoaded(true)} 
			onError={(er) => console.log(er)}
			/>
	}

	const configureNewGameHandler = () => {
		setGuessRound(0)
		setUserNumber(null)
	}
	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber)
	}

	const gameOverHandler = numOfRound => {
		setGuessRound(numOfRound)
	}

	let content = <StartGameScreen onStartGame={startGameHandler} />

	if(userNumber && guessRound <= 0) {
		content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
	} else if(guessRound > 0) {
		content = <GameOverScreen onRestart={configureNewGameHandler} roundNumber={guessRound} userNumber={userNumber} />
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
