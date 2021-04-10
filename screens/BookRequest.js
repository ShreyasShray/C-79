import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            bookName:'',
            reasonToRequest:'',
            userId:firebase.auth().currentUser.email
        }
    }
    createUniqueId=()=>{
        return Math.random().toString(36).substring(7)
    }
    addRequest=async(bookName, reasonToRequest)=>{
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        db.collection("book_request").add({
            book_name:bookName,
            reason_to_request:reasonToRequest,
            request_id:randomRequestId,
            user_id:userId
        });
        this.setState({
            bookName:'',
            reasonToRequest:''
        })
    }
    render(){
        return(
            <View>
                <KeyboardAvoidingView style={{alignItems:'center'}}>
                    <TextInput style={styles.inputBox} placeholder="Enter Book Name" onChangeText={(text)=>{this.setState({bookName:text})}} value={this.state.bookName}></TextInput>
                    <TextInput style={[styles.inputBox, {height:200}]} placeholder="Why do you need the Book?" multiline numberOfLines={12} onChangeText={(text)=>{this.setState({reasonToRequest:text})}} value={this.state.reasonToRequest}></TextInput>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.addRequest(this.state.bookName, this.state.reasonToRequest)}>
                        <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputBox:{
        marginTop:40,
        width:280,
        borderWidth:1.4,
        borderRadius:4,
        paddingLeft:4
    },
    buttonStyle:{
        width:200,
        alignItems:'center',
        shadowColor:'grey',
        shadowOffset:{width:0, height:4},
        backgroundColor:'skyblue',
        marginTop:30
    }
})