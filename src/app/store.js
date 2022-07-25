import {configureStore} from '@reduxjs/toolkit'
import signupFormReducer from '../signupFormSlice'

export default configureStore({
    reducer: {
        signupForm: signupFormReducer
    }
})