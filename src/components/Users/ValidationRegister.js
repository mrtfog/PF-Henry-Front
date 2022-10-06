export default function validate(values) {
  
    const regExp = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
    const errors = {};
    
    if (!values.email) {
      errors.email = 'A valid email address is required';
    }
    if (!values.password) {
      errors.password = 'Please type a password';
    }

    if ((regExp.test(values.password)) === false){
      errors.password = 'Password must have at least 8 characters, one uppercase, one lowercase and one digit'
    }

    if (values.password2 !== values.password){
      errors.password2 = 'Passwords do not match, please verify.'
    }
    if (!values.password2) {
      errors.password2 = "Please repeat the password above";
    }

    if (!values.firstname) {
      errors.firstname = "Please write your name";
    }

    if(values.firstname.length < 3) {
      errors.firstname = 'Your first name must have at least 2 characters'
    }

    if (!values.lastname) {
      errors.lastname = "Please write your last name";
    }

    if(values.lastname.length < 3) {
      errors.lastname = 'Your first name must have at least 2 characters'
    }

    if (!values.username) {
      errors.username = "A user name is required";
    }

    if(values.username.length < 4) {
      errors.username = 'Your first name must have at least 5 characters'
    }
    

    return errors;
  }