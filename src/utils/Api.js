import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

export const BASEURL = 'https://toss-time-server.vercel.app/api/';

export const APICall = async (
method,
endpoint,
params = {},
onSuccess,
onFailure,
formData = false,
refresh
) => {
try {
// console.log(`${BASEURL}${endpoint}`)
// Retrieve token from AsyncStorage
const token = await AsyncStorage.getItem('token');
// console.log(token,'hello')
const headers = {
'Content-Type': formData ? 'multipart/form-data' : 'application/json',
...(refresh ? { Authorization: `Bearer ${refresh}` } : token? {Authorization: `Bearer ${token}`}:{}),
};
// Configure axios request
const config = {
method,
url: `${BASEURL}${endpoint}`,
headers,
...(method === 'GET' ? { params } : { data: params }),
};
// console.log(config,"hhhhhhh>>>>>.")
// Perform API call
const response = await axios(config);
// console.log("response222",response.status)
if (response?.status >= 200 && response?.status < 300) {
onSuccess(response?.data);
} else {
onFailure({ message: 'Unexpected response from the server', response });
}
} catch (error) {
// Handle network errors or other unexpected errors
if (error.response) {
// API responded with an error status
onFailure(error.response?.data || error.response);
} else if (error.request) {
// Request made but no response received
onFailure({ message: 'Network error. Please check your connection.', error });
} else {
// Something happened while setting up the request
onFailure({ message: error.message });
}
}
};