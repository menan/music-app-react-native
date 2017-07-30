import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
    navigationBar: {
        backgroundColor: '#f0f',
        position: "absolute",
        paddingTop: 0,
        top: 0,
        height: 64,
        right: 0,
        left: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f0f'
  }
});

export default class Settings extends React.Component {

 // custom component
  /*static renderNavigationBar(props) {

    return (
      <View style={styles.navigationBar}>
        <Text>{props.title}</Text>
      </View>
    )
  } */

    render(){
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
                <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }
}