import { createContext, useEffect, useState } from "react";



const Context = createContext()


function ContextComponent({ children }) {

    const [funcReturnButton, setFuncReturnButton] = useState([]);
    let [lang, setLang] = useState()


    function addFuncToReturnButton(func) {
        funcReturnButton.unshift(func)
        setFuncReturnButton([...funcReturnButton])
    }


    function callFuncFromReturnButton(func) {
        if (funcReturnButton.length) {
            funcReturnButton[0]()
            funcReturnButton.splice(0, 1)
            setFuncReturnButton([...funcReturnButton])
        }
    }



    // splice
    // unshift
    return (
        <Context.Provider value={{
            funcReturnButton,
            setFuncReturnButton,
            addFuncToReturnButton,
            callFuncFromReturnButton,
            lang,
            setLang,
        }}>
            {children}
        </Context.Provider>
    );
}


export { Context, ContextComponent }