import React from 'react'
import {View, StyleSheet, Button, Image} from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    // source={require('../assets/success.png')}
                    source={{uri: 'https://www.geeky-gadgets.com/wp-content/uploads/2010/10/Everest-Summit.jpg'}}
                    style={styles.image}
                    resizeMode="cover" />
            </View>
            <BodyText>Number of rounds: {props.roundNumber}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <Button onPress={props.onRestart} title="NEW GAME" />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3, 
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default GameOverScreen