import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS
} from './types';

export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value}
    };
};

export const employeeCreate = ({ name, phone, shift }) => {

    const { currentUser } = firebase.auth();
//using return to satisfy redux-thunk rules for action creators that can return functions
// but not really dispatching anything
    return (dispatch) => {
        
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift })
        .then(() => {
            dispatch({ type: EMPLOYEE_CREATE });//helps reset form to initial state
            Actions.employeeList({type: 'reset'});
        });
        // Done saving,Now Navigate to screenlist head
        // type:reset means goto employeelist screen and reset entire view stack aka no backbutton
    };
};

export const employeesFetch = () => {

    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()});
            });
    };
};
//Saving does not update state...State is updated automatically by
// employeesFetch which dispatches action when new value arrives
export const employeeSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                Actions.employeeList({ type: 'reset' });
            })
            .catch((err)=>console.log('Employee_Save_Error: '+err));
    };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
    // not using dispatch here because once deleted
    // employeefetch does the rest of the updating
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                Actions.employeeList({ type: 'reset' });
            });
    }

};