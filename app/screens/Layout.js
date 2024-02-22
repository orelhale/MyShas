import { useContext, useEffect, useState } from "react";
import SelectLang from "../components/SelectLang";
import { getAllData, getLang, storeData } from "../storage/storageFunc";
import HomeScreen from "./HomeScreen";
import CompletAreaScreen from "./CompletAreaScreen";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { StyleSheet, View } from "react-native";
import globalColors from "../styleFile/globalColors";

import { Context } from './Context'

export default function Layout() {
   let { lang, setLang } = useContext(Context)

   let [showScreen, setShowScreen] = useState("HomeScreen")
   let [flagSaveDate, setFlagSaveDate] = useState(false)
   let [flagTo_FlagSaveDate, setFlagTo_FlagSaveDate] = useState(false)
   let [allData, setAllData] = useState()

   let timeToSave = 2000;


   useEffect(() => {
      getLang().then((data) => { setLang(data || false) })
      initData()
   }, [])

   useEffect(() => {
      console.log("lang ====== ", lang);
   }, [lang])


   useEffect(() => {
      if (flagSaveDate) {
         setTimeout(() => {
            setFlagTo_FlagSaveDate(true)
         }, timeToSave)
      }
   }, [flagSaveDate])

   useEffect(() => {
      if (flagTo_FlagSaveDate) {
         saveChanges(allData)
      }
   }, [flagTo_FlagSaveDate])


   async function initData() {
      let data = await getAllData()
      setAllData(data)
   }

   function needToSaveChanges(dataToSaveNow) {
      if (dataToSaveNow) {
         return saveChanges(dataToSaveNow)
      }
      if (!flagSaveDate) {
         setFlagSaveDate(true)
      }
   }

   function saveChanges(data) {
      setFlagSaveDate(false)
      setFlagTo_FlagSaveDate(false)

      // let catIndex = allData.findIndex((cat)=>cat.id == selectItem.catId)
      // let index = allData[catIndex].list.findIndex((gmara)=>gmara.id == selectItem.id)
      // console.log("catIndex === ",catIndex);
      // console.log("index === ",index);
      // console.log("allData[catIndex].list[index] === ",allData[catIndex].list[index]);

      storeData(data)
      console.log("---- Data saving  ----");
   }

   return (
      <View style={styles.Layout}>
         
         {lang && <AppHeader />}

         {lang && showScreen == 'HomeScreen' && (
            <HomeScreen
               setLang={setLang}
               lang={lang}
               allData={allData}
               setAllData={setAllData}
               needToSaveChanges={needToSaveChanges}
            />
         )}

         {lang && showScreen == 'CompletAreaScreen' && (
            <CompletAreaScreen
               allData={allData}
               setAllData={setAllData}
               needToSaveChanges={needToSaveChanges}
            />
         )}

         {(lang == false) && <SelectLang setLang={setLang} />}

         {lang && <AppFooter showScreen={showScreen} setShowScreen={setShowScreen} />}

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