import axios from "axios";
import { User } from "../models/models";


export const getAllUsers= async () => {
  try {
    const response = await axios.get('https://users-9aa14-default-rtdb.firebaseio.com/users.json');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};




const BASE_URL = 'https://users-9aa14-default-rtdb.firebaseio.com/users'; 

export const updateUser = async (userId: string, userData: User) => {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}.json`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

