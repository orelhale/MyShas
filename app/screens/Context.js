import { createContext, useEffect, useState } from "react";

const Context = createContext()

function ContextComponent({ children }) {

    const [funcReturnButton, setFuncReturnButton] = useState([]);
    let [lang, setLang] = useState()
    let [showLoader, setShowLoader] = useState(false)
    let [funcShowLoader, setFuncShowLoader] = useState({ func: null })
    let [startAgainMood, setStartAgainMood] = useState({ func: null })

    useEffect(() => {
        if (funcShowLoader.func) {
            funcShowLoader.func()
            funcShowLoader.func = null
        }
    }, [showLoader])

    function addFuncToReturnButton(func) {
        funcReturnButton.unshift(func)
        setFuncReturnButton([...funcReturnButton])
    }


    function callFuncFromReturnButton(func) {
        // מתי שחוזרים אחורה - מסיר את האייקון סיום מסכת
        !!startAgainMood.func && (startAgainMood.func = null);

        if (funcReturnButton.length) {
            funcReturnButton[0]()
            funcReturnButton.splice(0, 1)
            setFuncReturnButton([...funcReturnButton])
        }
    }

    function startLoader(func) {
        // reset startAgainMood when the loader start
        startAgainMood.func && (startAgainMood.func = null);
        
        func && (funcShowLoader.func = func)
        setShowLoader(new String('s'))
    }

    function stopLoader() {
        setShowLoader(false)
    }

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
            startAgainMood,
            setStartAgainMood
        }}>
            {children}
        </Context.Provider>
    );
}


export { Context, ContextComponent }