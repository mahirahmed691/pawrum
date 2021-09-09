import { StyleSheet, Dimensions } from "react-native";

import { ScreenWidth } from 'react-native-elements/dist/helpers';

const primaryColor = "whitesmoke" 
const secondaryColor = "white" 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      backgroundColor:primaryColor
    },
    container1: {
      flex: 1
    },
    bottomContainer: {
      position:'absolute',
      bottom:150,
      alignSelf:'center'
    },
    topContainer: {
      position:'absolute',
      top:150,
      alignSelf:'flex-start',
      alignItems:'flex-start',
      marginLeft:50,
    },
    title:{
        fontFamily:"Arial",
        fontSize:20,
        textAlign:'center'
    },
    subtitle:{
      fontFamily:"Arial",
      fontSize:16,
      textAlign:'center'
  
    },
    margin:{
      margin:10,
    },
    button:{
        marginTop:20,
        width:ScreenWidth*0.6,
        backgroundColor:'black'
    },
    brandName:{
      fontFamily:"Avenir",
      fontWeight:'900',
      fontSize:30,
      color:'whitesmoke',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 2,
    },
    logo:{
          alignSelf:'flex-start',
          alignItems:'flex-start',
          padding:10,
          borderRadius:15,
          transform: [{ rotate: '08deg' }],
      },
      input: {
        width: windowWidth*0.8,
        height: 40,
        backgroundColor: "lightgrey",
        marginTop: 8,
        marginBottom: 0,
        alignSelf: "center",
        padding: 7,
        borderRadius: 10,
      },
      navBar: {
        position:'absolute',
        bottom:0,
        padding:10,
        backgroundColor:secondaryColor,
        width: windowWidth,
        justifyContent: "space-evenly",
        flexDirection: "row",
        elevation: 10,
 
      },
      header:{
        position:"absolute",
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        top:0,
        left:0,
        right:0,
        backgroundColor:secondaryColor,
        height:80,
        width:windowWidth,
      },
      noWarning: {
        opacity: 0,
      },
      warning: {
        color: "black",
        marginTop:5,
        fontSize: 14,
        fontFamily:'Avenir',
        marginLeft:50,
        textTransform:'capitalize'
      },
      container2: {
        flex: 1,
        alignItems: 'center',
      },
      imageContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      },
      image: {
        flex: 1,
        alignItems: 'center',
      },
      background: {
        width: '100%', 
        height: '100%',
        alignItems: 'center',
      }
      
  });
  
  export { styles };