'use client';
import { configureStore } from "@reduxjs/toolkit";
import panierSlice from "./panier/panierSlice";
import {combineReducers} from 'redux';

const reducer = combineReducers({
    panierSlice: panierSlice
})



export const store = configureStore({
    reducer
});