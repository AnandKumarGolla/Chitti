// AddCustomer.js

import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';


export default class Reports extends Component {
    constructor(props) {
        super(props);
        
    }

    createPDF = () => {
        // let options = {
        //     html: '<h1>PDF TEST</h1>',
        //     fileName: 'test',
        //     directory: 'Documents',
        // };

        // let file = await RNHTMLtoPDF.convert(options)
        // // console.log(file.filePath);
        // alert(file.filePath);
    }


    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>

                    <TouchableHighlight onPress={this.createPDF}>
                        <Text>Create PDF</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#2a8ab7'
    },
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2a8ab7'
    },
    sub: {
        height: 100,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    itemInput: {
        height: 40,
        padding: 4,
        marginRight: 5,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});