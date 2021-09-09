import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../css/styles.js";
import useStatusBar from "../hooks/useStatusBar";

import { loginWithEmail } from "../components/Firebase/firebase";
import * as firebase from "firebase";
import "firebase/database";

const db = firebase.firestore();

export default function WelcomeScreen({ navigation }) {
  const [errorStyle, setErrorStyle] = useState(styles.noWarning);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Email or Password is invalid"
  );
  const [user, setUser] = useState();

  useStatusBar("light-content");
  
  async function logginTapped() {
    console.log(email);
    if (email && password) {
      try {
        await loginWithEmail(email, password);
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user.uid);
          if (user.uid) {
            navigation.navigate("Home");
          }
        });
      } catch (error) {
        console.log(error.message);
        setErrorStyle(styles.warning);
      }
    }
  }

  return (
    <View style={styles.container}>

      <View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
          ></TextInput>
          <View style={{ height: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(val) => setPassword(val)}
          ></TextInput>

          <Text style={errorStyle}>{errorMessage}</Text>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              paddingBottom: 20,
            }}
          >
            <Button
              style={{
                alignSelf: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text
                style={{
                  color: "black",
                  textTransform: "none",
                }}
              >
                Forgotten Password?
              </Text>
            </Button>
            <Button
              title="Login"
              style={{
                width: "100%",
                height: 42,
                backgroundColor: "black",
                alignSelf: "center",
                borderRadius: 10,
                justifyContent: "center",
                marginBottom: 20,
              }}
              onPress={() => logginTapped()}
            >
              <Text
                style={{
                  color: "white",
                  textTransform: "none",
                }}
              >
                Login
              </Text>
            </Button>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                height:50
              }}
            >
              
              <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Text 
                onPress={() => {
                navigation.navigate("Register")
                }} 
                style={{color:'grey', fontFamily:"Avenir", fontWeight:'700'}}
                >
              Don't have an account yet?{" "}
              <Text style={{ color: "black", fontWeight:"bold" }}>Sign Up</Text>
            </Text>
          </View>
              
            </View>
            
          </View>
        </View>
      </View>
    </View>
  );
}
