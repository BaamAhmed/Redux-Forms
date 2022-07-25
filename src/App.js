import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {validateForm, submitForm, clearForm, toggleShowPassword, clearLargeError, setLargeSuccess, setLargeError, clearLargeSuccess} from './signupFormSlice'
import './App.css';

const checkFieldsPresence = (formObj) => {
  const {email, username, password, phoneNum} = formObj
  if (email && username && password && phoneNum) {
      return true
  } else {
      return false
  }

}

const checkErrors = (errorObj) => {
  const {email, username, password, phoneNum} = errorObj
  if (email || username || password || phoneNum) {
      return false
  } else {
      return true
  }
}

function App() {
  const wholeState = useSelector(state => state.signupForm)
  const currentFormInput = useSelector(state => state.signupForm.formInput)
  const currentErrors = useSelector(state => state.signupForm.errors)
  const showPassword = useSelector(state => state.signupForm.showPassword)
  const largeError = useSelector(state => state.signupForm.largeError)
  const largeSuccess = useSelector(state => state.signupForm.largeSuccess)
  // console.log(currentErrors)
  const dispatch = useDispatch()


  const sideEffect = (state) => {
    if (checkFieldsPresence(state.formInput) && checkErrors(state.errors)) {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.formInput)
        }
        fetch('https://redux-forms-server.herokuapp.com/createuser', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.userMade) {
                dispatch(clearLargeError())
                dispatch(setLargeSuccess(`New user with email address ${data.userInfo.email} registered!`))
                
            } else {
                dispatch(clearLargeSuccess())
                dispatch(setLargeError(data.error))
            }
        })
    } else {
      dispatch(setLargeError('Please make sure to complete all the fields with valid information'))
    }
  }

  return (
    <div className="container mx-auto pt-10 p-6">
      <h1 className='font-bold text-4xl mb-3' >React Redux Forms w/ Toolkit</h1>
      
      <form action="">
        <div className='flex flex-col' >
          
          {largeError && 
          <div className="p-2 px-3 mb-10 rounded-md bg-red-500 text-white">
            <h1 className="font-bold text-lg">Whoops</h1>
            {largeError}
          </div>
          }
          {largeSuccess && 
          <div className="p-2 px-3 mb-10 rounded-md bg-emerald-700 text-white">
            <h1 className="font-bold text-lg">Yayyy</h1>
            {largeSuccess}
          </div>
          }

          <p>email</p>
          <input type="text" onChange={(e) => dispatch(validateForm({formInfo: currentFormInput, newInput: e.target.value, field: 'email'}))} placeholder='john.doe@gmail.com' value={currentFormInput.email} className='p-2 rounded-md bg-slate-300'/>
          <p className='text-red-500 font-medium text-md mb-3 '>{currentErrors.email && 'Please enter a valid email address'}</p>
          
          <p>username</p>
          <input type="text" onChange={(e) => dispatch(validateForm({formInfo: currentFormInput, newInput: e.target.value, field: 'username'}))} placeholder='JohnDoe22' value={currentFormInput.username} className='p-2 rounded-md bg-slate-300'/>
          <p className='text-red-500 font-medium text-md mb-3 '>{currentErrors.username && 'Usernames should contain only alphabets (and no spaces) and be between 5 to 15 characters in length'}</p>
          
          <p>password</p>
          <div className="flex">
            <input type={`${showPassword ? 'text' : 'password'}`} onChange={(e) => dispatch(validateForm({formInfo: currentFormInput, newInput: e.target.value, field: 'password'}))} placeholder='Password' value={currentFormInput.password} className='flex-grow p-2 rounded-md bg-slate-300'/>
            <button type='button' onClick={() => dispatch(toggleShowPassword())} className="p-2 px-3 bg-red-500 font-medium text-white">{showPassword ? 'Hide Password' : 'Show Password'}</button>
          </div>
          <p className='text-red-500 font-medium text-md mb-3 '>{currentErrors.password && 'Your password must contain lowercase and uppercase letters, at least one number and one symbol, and be longer than 8 characters'}</p>
          
          <p>phone number</p>
          <input type="text" onChange={(e) => dispatch(validateForm({formInfo: currentFormInput, newInput: e.target.value, field: 'phoneNum'}))} placeholder='+923092221593' value={currentFormInput.phoneNum} className='p-2 rounded-md bg-slate-300'/>
          <p className='text-red-500 font-medium text-md mb-3 '>{currentErrors.phoneNum && 'Please enter a valid phone number without any spaces or special characters and including your area code'}</p>
          
          <button type='button' onClick={() => sideEffect(wholeState)} className='text-white font-bold bg-red-500 p-2 rounded-md mb-3' >Submit</button>
          <button type='button' onClick={() => dispatch(clearForm())} className='text-white font-bold bg-teal-800 p-2 rounded-md' >Clear Form</button>
        </div>
      </form>
    </div>
  );
}

export default App;
