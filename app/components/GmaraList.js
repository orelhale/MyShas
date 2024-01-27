


import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button, I18nManager } from 'react-native';
import globalElements from '../styleFile/globalElements';


export default function GmaraList({
   allData,
   selectGmara,
   selectCatFunc,
   selectCat,
}) {

   let [listToShow, setCatsToShow] = useState()
   let RTL = I18nManager.isRTL

   useEffect(() => {
      if (allData) {
         setCatsToShow(allData)
      }
   }, [allData])

   // useEffect(() => {
   //    console.log("selectCat ==== ", selectCat);
   // }, [selectCat])

   function pressCat(item) {
      // console.log("item ==== ", item);
      selectCatFunc(item)
   }

   function removeSelect(item) {
      selectCatFunc(null)
   }

   return (
      <>
         {
            listToShow && !selectCat && <View style={[styles.wrapList]}>
               {listToShow.map((item, index) =>
                  <Pressable key={("Pressable1" + index)} style={[globalElements.item]} onPress={() => pressCat(item)}>
                     <Text>{item.name}</Text>
                  </Pressable>
               )}
            </View>
         }
         {
            selectCat && (
               <View>
                  <View style={[styles.wrapButtons, RTL && { flexDirection: "row-reverse" }]}>
                     <Button title={(` <- `)} onPress={() => { removeSelect() }}></Button>
                  </View>
                  <View style={[styles.wrapList]}>
                     {selectCat.list.map((item, index) =>
                        <Pressable key={("Pressable2" + index)} style={[globalElements.item]} onPress={() => { selectGmara(item) }}>
                           <Text>{item.name}</Text>
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
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: 'space-around',
   },
   catItem: {

   },
   item: {

   },
   wrapButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
});