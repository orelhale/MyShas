import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value) => {
   try {
      if (!value)
         throw new Error("Data of storeData is null")

      if (typeof value != "object")
         throw new Error("Data of storeData is not Object")

      const parceToString = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', parceToString);
   } catch (e) {
      console.log("Error: storeData = ", e);
   }
};


const getData = async () => {
   try {
      const jsonValue = await AsyncStorage.getItem('my-key');

      if (jsonValue != null) {
         return JSON.parse(jsonValue)
      }

      return initStorage()
   } catch (e) {
      console.log("Error: getData = ", e);
   }
};


async function initStorage() {
   console.log("****** initStorage *******");

   await storeData([])
   return await getData();
}