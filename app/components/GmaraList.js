


import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import globalElements from '../styleFile/globalElements';
import globalSizes from '../styleFile/globalSizes';
import ButtonApp from './ButtonApp';


export default function GmaraList({
   allData,
   selectGmara,
   selectCatFunc,
   selectCat,
}) {

   let [listToShow, setCatsToShow] = useState()

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
                  <TouchableOpacity key={("Pressable1" + index)} style={[globalElements.boxTtem]} onPress={() => pressCat(item)}>
                     <Text style={globalElements.textTtem}>{item.name}</Text>
                  </TouchableOpacity>
               )}
            </View>
         }
         {
            selectCat && (
               <View>
                  <View style={[styles.wrapButtons, globalSizes.flexRowReverse]}>
                     {/* <Button title={(` <- `)} onPress={() => { removeSelect() }}></Button> */}
                     <ButtonApp title={` <- `} onPress={() => { removeSelect() }} />
                  </View>
                  <View style={[styles.wrapList]}>
                     {selectCat.list.map((item, index) =>
                        <TouchableOpacity key={("Pressable2" + index)} style={[globalElements.boxTtem]} onPress={() => { selectGmara(item) }}>
                           <Text style={globalElements.textTtem}>{item.name}</Text>
                        </TouchableOpacity>)}
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
      marginBottom: 10,
   },
});