import { createContext, useEffect, useState } from "react";



const Context = createContext()


function ContextComponent({ children }) {

    const [funcReturnButton, setFuncReturnButton] = useState([]);
    let [lang, setLang] = useState()
    let [showLoader, setShowLoader] = useState(false)


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

    function startLoader() {
        setShowLoader(new String('s'))
    }

    function stopLoader() {
        setShowLoader(false)
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
            showLoader,
            startLoader,
            stopLoader,
        }}>
            {children}
        </Context.Provider>
    );
}


export { Context, ContextComponent }