import React, { useEffect, useState } from 'react';
import { styles } from '../css/styles';
import {user, uid, logout, auth, verifyEmail} from "../components/Firebase/firebase"
import { Text, SafeAreaView, View, Image } from 'react-native';
import { IconButton,  Button } from 'react-native-paper';

export default function ProfileScreent(props) {
        return (
            <SafeAreaView style={styles.container1}>
                <Text style={styles.title}>{auth.currentUser ? auth.currentUser.email.split("@")[0] : "unknown user"} </Text>
                <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                    <View>
                        <IconButton color="whitesmoke" size={80} icon="circle"/>
                    </View>
                    <View style={{flexDirection:'row', margin:20, justifyContent:'flex-end'}}>
                        <Text style={[styles.subtitle, styles.margin]}>
                            33{"\n"}
                            Posts
                        </Text >
                        <Text style={[styles.subtitle, styles.margin]}>
                            33{"\n"}
                            Followers
                        </Text>
                        <Text style={[styles.subtitle, styles.margin]}>
                            33{"\n"}
                                Following
                        </Text>
                    </View>
                </View>
                
                <View>
                    <Button 
                        style={{alignSelf:'center', backgroundColor:"lightgrey", width:"70%"}} 
                        mode="contained"
                        onPress={()=> props.navigation.navigate("EditProfile")}
                        >Edit Profile
                    </Button>        
                </View>


                <View style={{position:'absolute', bottom:40, right:0, left:0}}>
                    <Button 
                        style={{alignSelf:'center', backgroundColor:"lightgrey", width:"70%"}} 
                        mode="contained"
                        onPress={logout}
                        >Logout
                    </Button>        
                </View>
            </SafeAreaView>
        );
}

