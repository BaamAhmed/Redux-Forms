import {createSlice} from '@reduxjs/toolkit'

const validator = (field, data) => {
    switch (field){
        case 'phoneNum':
            if (data.length < 10) {
                return false
            } else {
                return true
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
            email: '',
            username: '',
            password: '',
            phoneNum: '',
        }
    },
    reducers: {
        validateForm: (state, action) => {
            state.formInput[action.payload.field] = action.payload.newInput
    
            if (!validator(action.payload.field, state.formInput.phoneNum) && state.errors[action.payload.field] === '') {
                state.errors[action.payload.field] = 'Error';
            }
            
        },
        submitForm: state => {
            console.log('submit form was called')
        },
        clearForm: state => {
            state.formInput = {
                email: '',
                password: '',
                username: '',
                phoneNum: ''
            }
        }
    }
})

export const {validateForm, submitForm, clearForm} = signupFormSlice.actions

export default signupFormSlice.reducer