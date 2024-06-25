import * as api from '../api';
import axios from 'axios';
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate)=> async (dispatch)=>{
    try{
        const { data }=await api.signUp(authData)
    dispatch({type: 'AUTH', data})
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile')) ))
    navigate('/')
    }
    catch(error)
    {
console.log(error)
    }
}

export const login = (authData, navigate)=> async (dispatch)=>{
    try{
        const { data }=await api.logIn(authData)
    dispatch({type: 'AUTH', data})
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile')) ))
    navigate('/')
    }
    catch(error)
    {
console.log(error)
    }
}
export const handleSendOtp = (email) => async (dispatch) => {
  try {
    await api.sendOtp(email); // Call the API function from your API file
    dispatch({ type: 'OTP_SENT' }); // Dispatch an action to update state (if needed)
  } catch (err) {
    console.error('Error sending OTP:', err);
    // Handle error state or dispatch an error action if necessary
  }
};
