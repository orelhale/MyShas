import HomeScreen from "./app/screens/HomeScreen"
import SelectLang from "./app/components/SelectLang";
import { useState } from "react";
import { getLang } from "./app/storage/storageFunc";


export default function App() {
  let [lang, setLang] = useState()

  getLang().then((data) => {
    setLang(data || false)
  })

  return (
    <>
      {lang && <HomeScreen setLang={setLang} lang={lang} />}
      {(lang == false) && <SelectLang setLang={setLang} />}
    </>
  );
}