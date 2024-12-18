import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [previousPrompts, setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    // the below code is used to provide the typing effect to the output para
    const delayPara =(index,nextWord)=>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const onSent = async (prompt) =>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
       const response = await run(input)

    //    here we are writting the below code to remove the starts where are coming n the output   
       let responseArray = response.split("**");
       let newResponse;
       for(let i=0; i<responseArray.length;i++)
       {
        if(i===0 || i%2 !==1){
            newResponse += responseArray[i];
            } 
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
       }

       let newResponse2 = newResponse.split("*").join("</br>")
       // till here and in the next line we are calling the variable

      let newResponseArray = newResponse2.split(" ");
      for(let i = 0; i<newResponseArray.length; i++)   {
        const nextWord = newResponseArray[i];
        delayPara(i,nextWord+" ")
      }   
       setLoading(false)
       setInput("")
    }
    
    const contextValue = {
        previousPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    
    )
        
}
export default ContextProvider