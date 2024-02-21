


import { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import globalElements from '../styleFile/globalElements';
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';
import ButtonApp from './ButtonApp';
import { Context } from '../screens/Context';


export default function GmaraList({
   allData,
   selectGmara,
   selectCatFunc,
   selectCat,
}) {

   let { setShowLoader, addFuncToReturnButton } = useContext(Context)

   // useEffect(() => {
   //    if (selectCat) {
   //       console.log("selectCat ===== ",selectCat);
   //    }
   // }, [])

   function pressCat(item) {
      // console.log("item ==== ", item);
      selectCatFunc(item)
      addFuncToReturnButton(removeSelect)
   }

   function pressGmara(item) {
      selectGmara(item)
      addFuncToReturnButton(() => selectGmara(null))
   }

   function removeSelect(item) {
      selectCatFunc(null)
   }

   return (
      <>
         {
            allData && !selectCat && <View style={[styles.wrapList, globalSizes.flexRow]}>
               {allData.map((item, index) =>
                  <Pressable
                     key={("Pressable1" + index)}
                     // style={[globalElements.boxTtem]}
                     style={({ pressed }) => [globalElements.boxTtem, (pressed && { backgroundColor: globalColors.backgroundGold })]}
                     onPress={() => pressCat(item)}
                  >
                     <Text style={globalElements.textTtem}>{item.name}</Text>
                  </Pressable>
               )}
            </View>
         }
         {
            selectCat && (
               <View>
                  {/* <View style={[styles.wrapButtons, globalSizes.flexRowReverse]}>
                     <ButtonApp title={` <- `} onPress={() => { removeSelect() }} />
                  </View> */}
                  <View style={[styles.wrapList, globalSizes.flexRow]}>
                     {selectCat.list.map((item, index) =>
                        <Pressable
                           key={("Pressable2" + index)}
                           // style={[globalElements.boxTtem]}
                           style={({ pressed }) => [globalElements.boxTtem, (pressed && { backgroundColor: globalColors.backgroundGold })]}

                           onPress={() => {
                              setShowLoader(new String("s"))
                              pressGmara(item)
                           }}
                        >
                           <Text style={globalElements.textTtem}>{item.name}</Text>
                        </Pressable>)}
                  </View>
               </View>
            )
         }
      </>
   )
}


const styles = StyleSheet.create({
   wrapList: {
      display: "flex",
      // flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: 'space-around',
   },
   catItem: {

   },
   item: {

   },
   wrapButtons: {
      // flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,

   },
});