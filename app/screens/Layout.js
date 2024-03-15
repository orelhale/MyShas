import { useContext, useEffect, useState } from "react";
import SelectLang from "../components/SelectLang";
import { getAllData, getLang, storeData } from "../storage/storageFunc";
import HomeScreen from "./HomeScreen";
import CompletAreaScreen from "./CompletAreaScreen";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import globalColors from "../styleFile/globalColors";

import { Context } from './Context'
import Loader4 from "../tempComponent/Loader4";
import CompletedTracking from "../components/CompletedTracking";
import globalSizes from "../styleFile/globalSizes";

export default function Layout() {
   let { lang, setLang, setFuncReturnButton, showLoader, startAgainMood } = useContext(Context)

   let [showScreen, setShowScreen] = useState("HomeScreen")
   let [flagSaveDate, setFlagSaveDate] = useState(false)
   let [flagTo_FlagSaveDate, setFlagTo_FlagSaveDate] = useState(false)
   let [allData, setAllData] = useState()

   let timeToSave = 2000;

   const heightS = Dimensions.get('screen').height;
   const whiteS = Dimensions.get('screen').width;


   useEffect(() => {
      getLang().then((data) => { setLang(data || false) })
      initData()
   }, [])

   useEffect(() => {
      console.log("lang ====== ", lang);
   }, [lang])


   useEffect(() => {
      // reset FuncReturnButton when the screen change
      setFuncReturnButton((data) => {
         if (data && data.length) {
            return []
         }
         return data
      })
   }, [showScreen])


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


         {/* רקע בזמן טעינה - כדי למנוע מהמשתמש ללחוץ על כפתורים כשיש טעינה, חזקקקקקקקק */}
         <View style={[styles.backgroundLoader, { display: showLoader ? "flex" : "none" }]}></View>
         {/* Loader */}
         <View style={[styles.wrapLoader, { display: showLoader ? "flex" : "none", top: ((heightS / 2) - 25), zIndex: 100, left: ((whiteS / 2) - 25) }]}>
            <Loader4 />
         </View>

         {!!startAgainMood &&
            <Pressable style={[globalSizes.flexRow, styles.warpStartAgain, { top: heightS - 180 }]} onPress={startAgainMood}>
               {/* <Text style={styles.textStartAgain}>{textToShow.he.startAgain}</Text> */}
               <Text style={styles.textStartAgain}>+</Text>
               <CompletedTracking />
            </Pressable>
         }

         {lang && <AppFooter showScreen={showScreen} setShowScreen={setShowScreen} />}

      </View >
   );
}



const styles = StyleSheet.create({
   Layout: {
      backgroundColor: globalColors.background,
      flex: 1,
      // marginTop: 5,
      // marginTop: 50,

   },
   wrapLoader: {
      position: "absolute",
      // backgroundColor: "#fff",
      // opacity: 0.5,
      zIndex: 100,
      opacity: 1,
   },
   backgroundLoader: {
      backgroundColor: "#ddd",
      opacity: 0.2,
      position: "absolute",
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: 'center',
      zIndex: 2,
   },
   warpStartAgain: {
      position: "absolute",
      button: 0,
      left: 40,
      height: 55,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 17,
      padding: 10,
      gap: 5,
      borderWidth: 1,
      borderColor: globalColors.gold,
      backgroundColor: globalColors.gold,
   },
   textStartAgain: {
      fontSize: 20,
   },
});