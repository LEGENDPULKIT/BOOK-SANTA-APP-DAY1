import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component
{
    constructor()
    {
        super();
        this.state={
            emailId:'',
            password:'',
        }
    }
    userSignUp=(emailId,password)=>
    {
        firebase.auth().createUserWithEmailAndPassword(emailId,password).then((response)=>
        {
            return Alert.alert("User added successfully")
        })
        .catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            console.log("error : "+errorMessage);
            return Alert.alert(errorMessage);
        })
    }

    userLogin=(emailId,password)=>
    {
        firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>
        {
            return Alert.alert("Successfully login")
        })
        .catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            console.log("error : "+errorMessage);
            return Alert.alert(errorMessage);
        })
    }
    render()
    {
        return(
            <View style={styles.container}>


           <View style={styles.profileContainer}>
               <Text style={styles.title}>BOOK SANTA</Text>
           </View>
            <View style={styles.buttonContainer}>

                <TextInput
                style={styles.loginBox}
                placeholder='email Id'
                keyboardType='email-address'
                onChangeText={(text)=>
                {
                    this.setState({emailId:text})
                }}
                />
                

                <TextInput
                style={styles.loginBox}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text)=>
                {
                    this.setState({password:text})
                }}
                />
                <TouchableOpacity
                style={[styles.button,{marginBottom:20,marginTop:20}]}
                onPress={()=>
                {
                    this.userLogin(this.state.emailId,this.state.password);
                    
                }}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>
                {
                    this.userSignUp(this.state.emailId,this.state.password);
                    
                }}
                >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View> 
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:'#f8be85',

    },
    loginBox:
    {
        justifyContent:'center',
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor:'ff8a65',
        fontSize:20,
        margin:10,
        paddingLeft:10,
    },
    title:
    {
        fontSize:65,
        fontWeight:'300',
        paddingBottom:30,
        color:'black',
    },
    profileContainer:
    {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonContainer:
    {
        flex:1,
        alignItems:'center',

    },
    button:
    {
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:"center",
        borderRadius:25,
        backgroundColor:'#ff9800',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:8,
        },
        shadowOpacity:0.30,
        shadowRadius:10.32,
        elevation:16,
    },
    buttonText:
    {
        fontWeight:'200',
        fontSize:20,
        color:'#ffff',
    }
})