import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {validateForm, submitForm, clearForm} from './signupFormSlice'
import './App.css';

function App() {
  const currentFormInput = useSelector(state => state.signupForm.formInput)
  const currentErrors = useSelector(state => state.signupForm.errors)
  console.log(currentErrors)
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto pt-10 p-6">
      <h1>React Redux w/ Toolkit</h1>
      <div className="flex flex-col mb-10">
        <h1 className="text-lg">Current Input</h1>
        <p>Email: {currentFormInput.email}</p>
        <p>Username: {currentFormInput.username}</p>
        <p>Password: {currentFormInput.password}</p>
        <p>Phone Num: {currentFormInput.phoneNum}</p>
      </div>
      <form action="">
        <div className='flex flex-col' >
          <p>email</p>
          <input type="text" onChange={(e) => dispatch(validateForm({formInfo: currentFormInput, newInput: e.target.value, field: 'email'}))} placeholder='Email Address' value={currentFormInput.email} className='p-2 rounded-md bg-slate-300 mb-3'/>
          <p className='text-red-500 font-bold text-lg'>{currentErrors.email}</p>
          <p>username</p>
          <input type="text" onChange={(e) => dispatch(validateForm({formInfo: currentFormInput, newInput: e.target.value, field: 'username'}))} placeholder='Username' value={currentFormInput.username} className='p-2 rounded-md bg-slate-300 mb-3'/>
          <p className='text-red-500 font-bold text-lg'>{currentErrors.username}</p>
          <p>password</p>
          <input type="text" onChange={(e) => dispatch(validateForm({formInfo: currentFormInput, newInput: e.target.value, field: 'password'}))} placeholder='Password' value={currentFormInput.password} className='p-2 rounded-md bg-slate-300 mb-3'/>
          <p className='text-red-500 font-bold text-lg'>{currentErrors.password}</p>
          <p>phone number</p>
          <input type="text" onChange={(e) => dispatch(validateForm({formInfo: currentFormInput, newInput: e.target.value, field: 'phoneNum'}))} placeholder='Phone Num' value={currentFormInput.phoneNum} className='p-2 rounded-md bg-slate-300 mb-3'/>
          <p className='text-red-500 font-bold text-lg'>{currentErrors.phoneNum}</p>
          <button className='text-white font-bold bg-red-500 p-2 rounded-md' >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
