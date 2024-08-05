import useWebSocket, { ReadyState } from "react-use-websocket";
import { queryClient, useApp } from "./ThemedApp";
import { useEffect } from "react";

export default function AppSocket(){
    const {auth}=useApp()

    const {sendJsonMessage,lastJsonMessage,readyState}=useWebSocket(import.meta.env.VITE_WS)




    useEffect(()=>{
        if(auth && readyState === ReadyState.OPEN){
            sendJsonMessage({
                token:localStorage.getItem("token")
            })

            console.log("ws connection ready and token send")
        }

    },[readyState,auth])


    useEffect(()=>{
        console.log("ws new message receiver")
        if(lastJsonMessage && lastJsonMessage.event){
            queryClient.invalidateQueries(lastJsonMessage.event)
        }

    },[lastJsonMessage])




    return (
        <>
        </>
    )








}