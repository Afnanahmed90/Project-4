import { GET_ALL_ENQUIRIES, GET_USER_ENQUIRIES, UPDATE_ENQUIRY, SUBMIT_ENQUIRY, ADD_FAILED, GET_ENQUIRY, ENQUIRIES_LOADING, LOGOUT_SUCCESS } from '../actions/types'
import axios from 'axios'
import {tokenConfig} from './authActions' //helper function we created to get the token from local storage
import {returnErrors} from './errorActions'


export const getALLEnquiries=()=> dispatch=>{
   // dispatch(setBooksLoading())
    axios
    .get('/api/enquiries')
    .then(res=>dispatch({
        type: GET_ALL_ENQUIRIES,
        payload: res.data
    }))
    .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
}

export const getUserEnquiries=(borrowerID)=> dispatch=>{
    // dispatch(setBooksLoading())
     axios
     .get(`/api/borrowers/${borrowerID}/enquiries`)
     .then(res=>dispatch({
         type: GET_USER_ENQUIRIES,
         payload: res.data
     }))
     .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
 }


//  export const submitANewEnqiry=(borrowerID,newEnquiry)=> dispatch=>{
//     // dispatch(setBooksLoading())
//      axios
//      .post(`/api/borrowers/${borrowerID}/enquiries`)
//      .then(res=>dispatch({
//          type: SUBMIT_ENQUIRY,
//          payload: res.data
//      }))
//      .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
//  }


 export const submitANewEnqiry=(newEnquiry)=> (dispatch)=>{ //get state get passed into the token config
    axios
    .post(`/api/borrowers/${newEnquiry.userID}/enquiries`,newEnquiry)

    .then(res => {
        if (res.data) {
          dispatch({
              type: SUBMIT_ENQUIRY,
              payload: res.data
          })
        }
      })
      .catch(err => { //if something goes wrong
        dispatch(
          returnErrors(err.response.data, err.response.status, 'ADD_FAILED')
        );
        dispatch({
          type: ADD_FAILED
        });
     

            //dispatch(returnErrors(error.response.data, error.response.status))
          
      });
    }


 export const updateEnquiry=(enquiryID,updateEnquiry)=> dispatch=>{
    // dispatch(setBooksLoading())
     axios
     .patch(`/api/enquiries/${enquiryID}`,updateEnquiry)
     .then(res=>dispatch({
         type: UPDATE_ENQUIRY,
         payload: enquiryID
     }))
     .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
 }

 
export const getEnquiry=(id)=>(dispatch)=>{
    axios
    .get(`/api/enquiries/${id}`)
    .then(res=>dispatch({
        type: GET_ENQUIRY,
        payload: res.data
    }))
    .catch(error=> dispatch(returnErrors(error.response.data, error.response.status)))
}
