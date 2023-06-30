import { configureStore } from '@reduxjs/toolkit'
import profileReducer from "../fetures/ProfileSlice/ProfileSlice"
import propertyReducer from "../fetures/ProfileSlice/PropertySilce"
import spinnerReducer from "../fetures/ProfileSlice/spinnerSlice"
import authReducer from "../fetures/ProfileSlice/selectIsLoggedIn"

export const store = configureStore({
  reducer:{
    profile: profileReducer,
    property: propertyReducer,
    spinner: spinnerReducer,
    auth: authReducer
  }
})