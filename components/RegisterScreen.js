import React, { useState } from "react";
import {
  SafeAreaView,

  View,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../css/styles.js";
import { registerWithEmail } from "../components/Firebase/firebase";

//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
//-------------firebase-------------

export default function RegisterScreen2(props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("00000000000");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [emailStyle, setEmailStyle] = useState(styles.noWarning);
  const [passwordStyle, setPasswordStyle] = useState(styles.noWarning);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(email, password) {
    try {
      await registerWithEmail(email, password).then(() => {
        props.navigation.navigate("Login", {
          phone: phone,
        });
      });
    } catch (error) {
      setErrorMessage(error.message);
      setEmailStyle(styles.warning);
    }
  }

  function nextButtonPressed() {
    if (!password) {
      setPasswordMessage("* Password must be filled in");
      setPasswordStyle(styles.warning);
    } else {
    }
    if (!email) {
      setErrorMessage("* Email must be filled in");
      setEmailStyle(styles.warning);
    }
    let re = /^(?=.*\d)(?=.*[!-@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (re.test(password)) {
      if (password === password2) {
        handleSubmit(email, password);
        console.log("passed");
      } else {
        console.log("fail");
        setPasswordMessage("* Passwords do not match");
        setPasswordStyle(styles.warning);
      }
    } else if (password) {
      setPasswordMessage(
        "* password must be at least 8 characters long and contain 1 upper + lower case letter a number and a special character"
      );
      setPasswordStyle(styles.warning);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
        <View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email *"
              keyboardType="email-address"
              onChangeText={(val) => setEmail(val)}
            ></TextInput>
            <Text style={emailStyle}>{errorMessage}</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              onChangeText={(val) => setPhone(val)}
            ></TextInput>

            <Text style={styles.noWarning}>.</Text>
            <TextInput
              style={styles.input}
              placeholder="Password *"
              secureTextEntry={true}
              onChangeText={(val) => setPassword(val)}
            ></TextInput>
            <Text style={styles.noWarning}>.</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password *"
              secureTextEntry={true}
              onChangeText={(val) => setPassword2(val)}
            ></TextInput>
            <Text style={passwordStyle}>{passwordMessage}</Text>
          </View>
          <Button
            style={{backgroundColor:"black", width:"80%", alignSelf:'center', margin:20}}
            mode="contained"
            onPress={() => {
              nextButtonPressed();
            }}
          >Create Account</Button>
        </View>

        <View
          style={{
            marginBottom: 20,
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
                props.navigation.navigate("Login")
                }} 
                style={{color:'grey', fontFamily:"Avenir", fontWeight:'700'}}
                >
              Already have an account?{" "}
              <Text style={{ color: "black", fontWeight:"bold" }}>Sign In</Text>
            </Text>
          </View>
        </View>
    </SafeAreaView>
  );
}
