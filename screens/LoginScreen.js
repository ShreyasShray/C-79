import * as React from 'react';
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            first_name:'',
            last_name:'',
            mobile_number:'',
            address:'',
            confirm_password:'',
            user_name:'',
            isModalVisible:false
        }
    }
    userSignUp=async(email, password, confirm_password)=>{
        if(password!==confirm_password){
            return Alert.alert("Password Doesn't Match");
        }else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                db.collection("users").add({
                    first_name:this.state.first_name,
                    last_name:this.state.last_name,
                    address:this.state.address,
                    user_name:this.state.user_name,
                    mobile_number:this.state.mobile_number
                })
                Alert.alert("User Added successfully")
            })
            .catch((error)=>{
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            });
        }
    }
    userLogin=async(email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            this.props.navigation.navigate("BottomTabNavigator")
            Alert.alert("login")
        })
        .catch((error)=>{
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    }
    showModal=()=>{
        return(
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.state.isModalVisible}
            >
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.modalInputBoxContainer}>
                            <TextInput style={styles.modalInputBox} placeholder="First Name" maxLength={10} onChangeText={(text)=>{this.setState({first_name:text})}} />
                            <TextInput style={styles.modalInputBox} placeholder="Last Name" maxLength={10} onChangeText={(text)=>{this.setState({last_name:text})}} />
                            <TextInput style={styles.modalInputBox} placeholder="Mobile Number" keyboardType={'numeric'} maxLength={10} onChangeText={(text)=>{this.setState({mobile_number:text})}} />
                            <TextInput style={styles.modalInputBox} placeholder="Eamil Address" keyboardType="email-address" onChangeText={(text)=>{this.setState({emailId:text})}} />
                            <TextInput style={styles.modalInputBox} placeholder="Address"  multiline={true} onChangeText={(text)=>{this.setState({address:text})}} />
                            <TextInput style={styles.modalInputBox} placeholder="User Name" onChangeText={(text)=>{this.setState({user_name:text})}} />
                            <TextInput style={styles.modalInputBox} placeholder="Create Password" secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text})}} />
                            <TextInput style={styles.modalInputBox} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(text)=>{this.setState({confirm_password:text})}} />
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.modalButtonStyle} onPress={()=>{this.setState({isModalVisible:false})}}><Text style={{fontSize:20, fontWeight:'bold'}}>back</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.modalButtonStyle} onPress={()=>{this.userSignUp(this.state.emailId, this.state.password, this.state.confirm_password)}}><Text style={{fontSize:20, fontWeight:'bold'}}>Register</Text></TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View>
                    <Text style={styles.appHeader}>Book Santa</Text>
                </View>
                <View>
                    {this.showModal()}
                </View>
                <View style={{alignItems:'center'}}>
                    <TextInput placeholder="abc@example.com" style={styles.inputBox} keyboardType="email-address" onChangeText={(text)=>{this.setState({emailId:text})}}></TextInput>
                    <TextInput placeholder="password" style={styles.inputBox} secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text})}}></TextInput>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.setState({isModalVisible:true})}>
                        <Text style={{fontWeight:'bold', fontSize:20}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.userLogin(this.state.emailId, this.state.password)}}>
                        <Text style={{fontWeight:'bold', fontSize:20}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    appHeader:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        backgroundColor:'skyblue',
        paddingTop:34,
        paddingBottom:4,
        marginBottom:140
    },
    inputBox:{
        borderWidth:1.4,
        borderRadius:4,
        paddingLeft:4,
        width:300,
        marginTop:40
    },
    buttonStyle:{
        backgroundColor:'skyblue',
        borderRadius:6,
        alignItems:'center',
        width:120,
        justifyContent:'center',
        textAlign:'center'
    },
    buttonContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:140
    },
    modalInputBoxContainer:{
        alignItems:'center'
    },
    modalInputBox:{
        paddingLeft:5,
        borderWidth:1.4,
        borderRadius:4,
        width:280,
        marginTop:30
    },
    modalButtonStyle:{
        borderRadius:6,
        backgroundColor:"skyblue",
        paddingLeft:6,
        paddingRight:6,
        marginLeft:30,
        marginRight:30
    },
    modalButtonContainer:{
        display:'flex',
        flexDirection:'row',

        marginTop:40
    }
})