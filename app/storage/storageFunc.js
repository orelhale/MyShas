import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from "../data/baseData_list.json";

const storeData = async (value) => {
   try {
      if (!value)
         throw new Error("Data of storeData is null")

      if (typeof value != "object")
         throw new Error("Data of storeData is not Object")

      const parceToString = JSON.stringify(value);
      
      return AsyncStorage.setItem('data', parceToString);
   } catch (e) {
      console.log("Error: storeData = ", e);
   }
};


const getData = async () => {
   try {
      const jsonValue = await AsyncStorage.getItem("data");

      if (jsonValue != null) {
         return JSON.parse(jsonValue)
      }

      return jsonValue
   } catch (e) {
      console.log("Error: getData = ", e);
   }
};
// const getData = async (key) => {
//    try {
//       const jsonValue = await AsyncStorage.getItem(key || "");

//       if (jsonValue != null) {
//          return JSON.parse(jsonValue)
//       }

//       return jsonValue
//    } catch (e) {
//       console.log("Error: getData = ", e);
//    }
// };

const getAllData = async () => {
   try {
      let data = await getData()
      
      // console.log("data = ", data);
      
      if(!data){
         data = await initStorage()
      }
      return data
   } catch (e) {
      console.log("Error: getAllData = ", e);
   }
};



async function initStorage() {
   console.log("****** initStorage *******");
   // console.log("storage ===== ", storage);
   await storeData(storage)
   return await getData();
}

async function deleteAllData() {
   console.log("*** deleteAllData ***");
   await AsyncStorage.setItem('data', "")
}
// deleteAllData()
export { getAllData,deleteAllData ,storeData}