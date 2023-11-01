import {configureStore } from "@reduxjs/toolkit"
import GlobalValuesSlice from "../features/GlobalValues"
// const reduxLogger=require("redux-logger")


// const logger=reduxLogger.createLogger()
const store=configureStore({
    reducer:{
        GlobalValues:GlobalValuesSlice
        

    },
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
})
export default store
// module.exports=store