// import React, {useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux'


export default function validate(values) {
    const errors = {};
    
    if (!values.email) {
      errors.email = 'A valid email address is required';
    }
    if (!values.password) {
      errors.password = 'Please type a password';
    }

    
    return errors;
  }