import { StyleSheet } from "react-native";
import globalColors from "./globalColors";

export default globalElements = StyleSheet.create({
   element: {

   },
   boxTtem: {
      marginBottom: 10,
      // backgroundColor: globalColors.gold,
      backgroundColor: 'red',
      color: "red",
      fontSize: 30,
      flexBasis: "30%",
      justifyContent: 'center',
      alignItems: "center",
      height: 60,
      borderRadius: 20,
      // width:60,
   },
   textTtem: {
      // color: globalColors.secondary,
   },
   btnWrap: {
      borderRadius: 5,
      // backgroundColor: globalColors.secondary,
      backgroundColor: "#ddd",
      justifyContent: 'center',
      alignItems: "center",
      // borderColor: globalColors.gold,
      // borderWidth: 1,
      // height: 40,
      // width: 40,
   },
   btnText: {
      // color: globalColors.gold,
      fontSize: 20,
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
   },
   page: {
      marginBottom: 20,
      // marginTop: 5,
   },
   checkBox: {
      // padding: 10,
      // marginTop: 5,
   }

});