import { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Menu, Divider, Provider, List, Colors } from 'react-native-paper';
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';
import AppIcon from '../components/AppIcon';
import textToShow from '../data/textToShow';
import { Context } from '../screens/Context';
let heightS = Dimensions.get('screen').height

import MIcon from "react-native-vector-icons/MaterialCommunityIcons"

export default function MenuG({ setShowEmailPopup }) {

   let { lang } = useContext(Context)

   const [visible, setVisible] = useState(false);

   const closeMenu = () => setVisible(false);

   const openMenu = () => setVisible(true);
   useEffect(() => {
      console.log("visible = " + visible);
   }, [visible])

   return (
      <Provider>
         <View style={[styles.MenuContainer, globalSizes.flexRow]}>
            <Menu
               visible={visible}
               onDismiss={closeMenu}
               anchor={<AppIcon name='menu' onPress={openMenu} color={globalColors.gold2} />}
               style={styles.Menu}
            // statusBarHeight={50}
            >
               {/* <Menu.Item leadingIcon="email-outline" color={'red'} title={(textToShow[lang].Contact + "")} /> */}
               {/* <Divider /> */}

               <Pressable
                  onPress={() => { setShowEmailPopup(new String('true')); closeMenu() }}
                  style={({ pressed }) => [globalSizes.flexRow, styles.wrapButton, pressed && { backgroundColor: globalColors.backgroundGold }]}
               >
                  <Text style={styles.text}>{textToShow[lang].Contact}</Text>
                  <MIcon
                     name='email-outline'
                     style={styles.icon}
                  />
               </Pressable>
            </Menu>

            {visible && <Pressable style={styles.backgoundClosing} onPress={closeMenu}></Pressable>}
         </View>
      </Provider>
   )
};

const styles = StyleSheet.create({
   MenuContainer: {

   },
   Menu: {

   },
   backgoundClosing: {
      position: "absolute",
      width: '100%',
      height: heightS,
      zIndex: 1000,

   },
   wrapButton: {
      // backgroundColor:"red",
      justifyContent: "space-between",
      alignItems: 'center',
      width: 150,
      // paddingRight: 12,
      // paddingLeft: 12,
      padding: 12,
      // height: 35,
   },
   text: {
      fontSize: 16,
      color: "#555",

   },
   icon: {
      fontSize: 25,
      color: "#555",
   },
})

