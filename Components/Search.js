import React, { Component } from 'react';
import {View,
    Text,
    StyleSheet,
    TextInput,
    ListView,
    TouchableOpacity,
    Dimensions,
    Platform
} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Strings from '../Utilities/Strings';
import Icon from 'react-native-vector-icons/Ionicons';
import LikeButton from './LikeButton';
import AlbumListItem from './AlbumListItem';

const window = Dimensions.get('window');

var styles = StyleSheet.create({
    view:{

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 30,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
    input: {
        marginLeft: 10,
        marginTop: (Platform.OS === 'ios') ? 30 : 20,
        marginRight: 10,
        paddingLeft: 10,
        height: (Platform.OS === 'ios') ? 30 : 40,
        flex: 2,
        borderColor: 'lightgray',
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderRadius: 4,
        fontFamily: Strings.titleFont,

    },
    dismiss: {
        marginTop: 30,
        marginRight: 5,
        marginLeft: 15,
        height: 40,
        color: Strings.tintColor
    },
    songTitle:{
        color: Strings.tintColor,
        fontFamily: Strings.titleFont,
        fontSize: 20,
    },
    album: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    albumList:{
        marginTop: 35,
        borderTopWidth: 1,
        height: window.height - 75,
        borderTopColor: 'lightgray',
    }
});

export default class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            albums: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            searched: false,
        }
    }


  componentDidMount(){
    console.log('albums',this.props.passProps.getAlbums())
    this.nameInput.focus();
  }
  
  handleText(text){
    console.log('text length',text.length)
    if (text.length <= 0){
        this.setState({
            searched: false,
        })
        return;
    }
    var newAlbums = this.props.passProps.getAlbums().filter(function (el) {
        return el.title.indexOf(text) > -1|| el.tags.join().indexOf(text) > -1;
    });

    console.log('searched albums',newAlbums)
    this.setState({
        albums: newAlbums,
        dataSource: this.state.dataSource.cloneWithRows(newAlbums),
        searched: true,
    })


  }
  
    render(){
        console.log('this state: ', this.state)
        return (
            <View style={styles.view}>
                <View style={styles.container}>
                    <Icon onPress={ Actions.pop } style={ styles.dismiss }  name={(Platform.OS === 'ios') ? "ios-arrow-back" :  "md-arrow-back"} size={25} color={Strings.tintColor} />
                    <TextInput
                        ref={(input) => { this.nameInput = input; }} 
                        style={styles.input}
                        autoCapitalize='sentences'
                        underlineColorAndroid={Strings.tintColor}
                        autoCorrect={false}
                        placeholder={Strings.ta.searchPlaceholder}
                        onChangeText={this.handleText.bind(this)}
                        />
                </View>
                {this.state.searched && 
                    <ListView
                    style={ styles.albumList }
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    keyboardDismissMode='on-drag'
                    renderRow={ ( album ) => <AlbumListItem album={ album } /> }/>
                    }
            </View>
        );
    }
}