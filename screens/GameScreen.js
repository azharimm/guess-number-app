import React, {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native'
import { Ionicons} from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.ceil(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    }else {
        return rndNum
    }
}

const GameScreen = props => {
    const initalGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initalGuess)
    const [pastGuess, setPassGuess] = useState([initalGuess])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver} = props

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuess.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if((direction == 'lower' && currentGuess < props.userChoice) || (direction == 'greater' && currentGuess > props.userChoice)) {
            
            Alert.alert('Don\'t lie!', 'You know that this is wrong!', [{text: 'Sorry', style: 'cancel'}])
            return
        }

        if(direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        // setRoud(currentRound => currentRound + 1)
        setPassGuess(curPassGuess => [nextNumber, ...curPassGuess])
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <ScrollView>
                {pastGuess.map(guess => <View key=""><Text>{guess}</Text></View>)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen