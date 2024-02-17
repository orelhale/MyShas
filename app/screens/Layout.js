import { useContext, useEffect, useState } from "react";
import SelectLang from "../components/SelectLang";
import { getAllData, getLang } from "../storage/storageFunc";
import HomeScreen from "./HomeScreen";
import CompletAreaScreen from "./CompletAreaScreen";
import AppHeader from "../components/AppHeader";
import { StyleSheet, View } from "react-native";
import globalColors from "../styleFile/globalColors";

import { Context } from './Context'

export default function Layout() {
   let [showScreen, setShowScreen] = useState("HomeScreen")

   let { lang, setLang } = useContext(Context)

   getLang()
      .then((data) => {
         setLang(data || false)
      })

   useEffect(() => {
      initData()
   }, [])

   useEffect(() => {
      console.log("lang ====== ", lang);
   }, [lang])


   async function initData() {
      let data = await getAllData()
      setAllData(data)
   }

   let [allData, setAllData] = useState()



   return (
      <View style={styles.Layout}>
         {lang && <AppHeader showScreen={showScreen} setShowScreen={setShowScreen} />}
         {lang && showScreen == 'HomeScreen' && <HomeScreen
            setLang={setLang}
            lang={lang}
            allData={allData}
            setAllData={setAllData}
         />}
         {lang && showScreen == 'CompletAreaScreen' && <CompletAreaScreen />}
         {(lang == false) && <SelectLang setLang={setLang} />}
      </View>
   );
}



const styles = StyleSheet.create({
   Layout: {
      backgroundColor: globalColors.background,
      flex: 1,
      // marginTop: 5,
      // marginTop: 50,

   },
});