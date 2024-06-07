import { useEffect, useState } from 'react'
import { StyleSheet, Button, View, Text, TextInput } from 'react-native'
import emailjs from '@emailjs/react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import { ScrollView } from 'react-native';
import AppIcon from './AppIcon';
import globalSizes from '../styleFile/globalSizes';


export default function Email({ clossEmailPopup }) {

   const { type, isConnected } = useNetInfo();
   const [email, setEmail] = useState("")
   const [subject, setSubject] = useState("")
   const [message, setMessage] = useState("")
   const [errorMessage, setErrorMessage] = useState("")


   useEffect(() => {
      emailjs.init({ publicKey: 'B3syCcyPLJOkfobvr' });
   }, [])


   function sendEmail(email, subject, message) {
      console.log({ email, subject, message });
      const templateParams = {
         email: email,
         subject: subject,
         message: message,
         to_name: "Orel the best developer",
      };

      emailjs
         .send('service_myshas', 'template_myshas', templateParams)
         .then(
            (response) => console.log('MAIL SUCCESS!', response.status, response.text),
            (err) => console.log('FAILED...', err),
         );
   }

   function checkEmailData() {
      if (!(email + "").trim())
         return setErrorMessage("The email is empty");

      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const validEmail = emailRegex.test(email);

      if (!validEmail)
         return setErrorMessage("The email is invalid");

      if (!(message + "").trim())
         return setErrorMessage("The message is message");

      if (!isConnected)
         return setErrorMessage("No internet");

      sendEmail((email + "").trim(), (subject + "").trim(), (message + "").trim());
      clossEmailPopup();
   }

   function inputChange(e) {
      errorMessage && setErrorMessage("");
   }

   return (
      <View style={styles.Email}>

         <View style={{ width: '100%' }}>
            <TextInput onChange={inputChange} placeholder='Email' style={[styles.input, styles.borderStyle]} onChangeText={setEmail} />
         </View>

         <View style={{ width: '100%' }}>
            <TextInput onChange={inputChange} placeholder='Subject' style={[styles.input, styles.borderStyle]} onChangeText={setSubject} />
         </View>

         <ScrollView style={[styles.wrapTextarea, styles.borderStyle]}>
            <TextInput
               onChange={inputChange}
               placeholder='message'
               style={[styles.input, styles.textarea]}
               onChangeText={setMessage}
               multiline={true}
               numberOfLines={6}
            />
         </ScrollView>

         <View style={styles.wrapErrorMessage}>
            <Text style={styles.errorMessage}>{errorMessage && `* ${errorMessage}`}</Text>
         </View>

         <View style={[globalSizes.flexRowReverse, { justifyContent: "space-around", width: "100%" }]}>
            <AppIcon
               name={'x'}
               type={5} style={[styles.baseIcon]}
               onPress={clossEmailPopup}
            />

            <AppIcon
               name={'send-sharp'}
               type={3}
               onPress={checkEmailData}
               style={[styles.baseIcon, { paddingLeft: 5 }]}
            />
         </View>

      </View>
   )
}

const styles = StyleSheet.create({
   Email: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: "#ddd",
      // borderWidth: 1,
      paddingVertical: 50,
      paddingHorizontal: 30,
      borderRadius: 10,
      width: 350,

      // shadowOffset: { width: 40, height: 40 },
      // shadowColor: "#000",
      // shadowOpacity: 0.8,
      // shadowRadius: 2,
      elevation: 25,

   },
   input: {
      fontSize: 18,
      width: '100%',
      padding: 12,
      marginBottom: 20,
   },
   borderStyle: {
      borderWidth: 1,
      borderColor: "#ccc",
   },
   wrapTextarea: {
      width: '100%',
      height: 166,
      padding: 12,
   },
   textarea: {
      padding: 0,
      textAlignVertical: 'top',
      borderColor: "red",
   },
   wrapErrorMessage: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
      // padding: 0,
      // textAlignVertical: 'top',
      // borderColor: "red",
   },
   errorMessage: {
      color: "red",
   },
   baseIcon: {
      width: 40,
      height: 40,
      borderRadius: 40
   },
})