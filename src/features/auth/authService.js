import axios from 'axios';
import {SERVER_URL} from '../../configure.js'


const API_URL=`${SERVER_URL}/api/users/`

const register=async(userData)=>{
   
    const response=await axios.post(API_URL,userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const logout=async()=>{
    localStorage.removeItem('user')
}

const login=async(userData)=>{
    console.log(SERVER_URL)
    const response=await axios.post(API_URL+'login',userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}


const authService={
    register,
    logout,
    login
}

export default authService