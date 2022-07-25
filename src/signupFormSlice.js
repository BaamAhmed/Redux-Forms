import {createSlice} from '@reduxjs/toolkit'
import validator from 'validator'

const validFunc = (field, data) => {
    switch (field){
        case 'email':
            if ((validator.isEmail(data)) || data.length === 0){
                return true
            } else {
                return false
            }
        case 'username':
            if ((validator.isAlpha(data) && validator.isLength(data, {min: 5, max: 15}) && !validator.contains(data, ' ')) || data.length === 0) {
                return true
            } else {
                return false
            }
        case 'password':
            if (validator.isStrongPassword(data)){
                return true
            } else {
                return false
            }
        case 'phoneNum':
            if ((validator.isMobilePhone(data, 'en-PK', {strictMode: true})) || data.length === 0) {
                return true
            } else {
                return false
            }
        default:
            return false
    }
}



export const signupFormSlice = createSlice({
    name: 'signupform',
    initialState: {
        formInput: {
            email: '',
            password: '',
            username: '',
            phoneNum: ''
        },
        errors: {
            email: false,
            username: false,
            password: false,
            phoneNum: false,
            
        },
        showPassword: false,
        largeError: '',
        largeSuccess: ''
    },
    reducers: {
        validateForm: (state, action) => {
            state.formInput[action.payload.field] = action.payload.newInput
            if (!validFunc(action.payload.field, state.formInput[action.payload.field])) {
                state.errors[action.payload.field] = true;
            } else {
                state.errors[action.payload.field] = false;
            }
            
        },
        submitForm: state => {
        },
        setLargeError: (state, action) => {
            state.largeError = action.payload
        },
        clearLargeError: state => {
            state.largeError = ''
        },
        setLargeSuccess: (state, action) => {
            state.largeSuccess = action.payload
        },
        clearLargeSuccess: state => {
            state.largeSuccess = ''
        },
        
        clearForm: state => {
            state.formInput = {
                email: '',
                password: '',
                username: '',
                phoneNum: ''
            }
            state.errors = {
                email: false,
                username: false,
                password: false,
                phoneNum: false,
                
            }
            state.largeError= ''
            state.largeSuccess = ''
            
            
        },
        toggleShowPassword: state => {
            state.showPassword = !state.showPassword
        }
    }
})


export const {validateForm, submitForm, clearForm, toggleShowPassword, setLargeError, clearLargeError, setLargeSuccess, clearLargeSuccess} = signupFormSlice.actions

export default signupFormSlice.reducer