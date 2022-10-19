import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRegisterStatus, postNewUser } from "../../redux/actions/users";
import { useFormik } from "formik";
import validate from "./ValidationRegister";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import style from "../../scss/components/Users/_register.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import GoogleSignIn from "./GoogleSignIn";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

export default function Register() {
  const { signUp } = useAuth();

  let history = useHistory();
  const registerStatus = useSelector(
    (state) => state.usersReducer.registerStatus
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password2: "",
      firstname: "",
      lastname: "",
      username: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      // reservation:[] es para crear usuarios que ya tengan algo añadido en el carrito previamente al registro.
      // dispatch(postNewUser({user:values, reservations: []}))
      const { email, password, username } = values;
      signUp(email, password, username);
      resetForm({ values: "" });
      history.push("/");
    },
  });

  // console.log('Esto es registerStatus -> ', registerStatus)

  const [type, setType] = useState("password");

  // function handleGoogleSignIn(){

  //     signInWithGoogle()
  //     history.push('/')
  // }

  function handleClick() {
    setType(type === "password" ? "text" : "password");
  }

  useEffect(() => {
    if (registerStatus === 201) {
      Swal.fire({
        text: "Your registration was completed successfully",
        icon: "success",
        iconColor: "#497aa6",
        showCloseButton: true,
        confirmButtonText: "Log In",
        allowEnterKey: false,
        customClass: {
          popup: "Alert",
          closeButton: "closeButton",
          confirmButton: "confirmButton",
          denyButton: "denyButton",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
    }

    if (registerStatus && registerStatus !== 201) {
      Swal.fire({
        text: "Something went wrong",
        icon: "error",
        iconColor: "#497aa6",
        confirmButtonText: "Try Again",
        showCloseButton: true,
        allowEnterKey: false,
        customClass: {
          popup: "Alert",
          closeButton: "closeButton",
          confirmButton: "confirmButton",
          denyButton: "denyButton",
        },
      });
    }
  }, [registerStatus]);

  return (
    <div className={style.registerContainer}>
      <div className={style.imageContainer}>
        <Link to="/" className={style.navLogo}>
          <h2>HPFC</h2>
        </Link>

        <h3>Enjoy without spoilers</h3>
      </div>

      <div className={style.formSideContainer}>
        <div className={style.formContainer}>
          <form onSubmit={formik.handleSubmit}>
            <h1>Create account</h1>
            <div className={style.inputContainer}>
              <label>First name</label>
              <input
                placeholder="John"
                type="text"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
              />
              {formik.errors.firstname ? (
                <span className={style.errorMessage}>
                  *{formik.errors.firstname}
                </span>
              ) : null}
            </div>
            <div className={style.inputContainer}>
              <label>Last name</label>
              <input
                placeholder="Doe"
                type="text"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />
              {formik.errors.lastname ? (
                <span className={style.errorMessage}>
                  *{formik.errors.lastname}
                </span>
              ) : null}
            </div>
            <div className={style.inputContainer}>
              <label>User name</label>
              <input
                placeholder="john_doe"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username ? (
                <span className={style.errorMessage}>
                  *{formik.errors.username}
                </span>
              ) : null}
            </div>
            <div className={style.inputContainer}>
              <label>Email</label>
              <input
                placeholder="john_doe@company.com"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <span className={style.errorMessage}>
                  *{formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className={style.inputContainer}>
              <label>Password</label>
              <input
                placeholder="Must have at least 8 characters"
                type={type}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <span className={style.errorMessage}>
                  *{formik.errors.password}
                </span>
              ) : null}
            </div>
            <div className={style.inputContainer}>
              <label>Confirm password</label>
              <div className={style.passContainer}>
                <input
                  placeholder="Repeat the password above"
                  id="password2"
                  type={type}
                  name="password2"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                />
                <div
                  id="showButton"
                  className={style.showButton}
                  onClick={handleClick}
                >
                  {type === "password" ? (
                    <svg
                      width="22px"
                      height="16px"
                      viewBox="0 0 22 22"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <path
                        d="M12,4.5 C7,4.5 2.73,7.61 1,12 C2.73,16.39 7,19.5 12,19.5 C17,19.5 21.27,16.39 23,12 C21.27,7.61 17,4.5 12,4.5 Z M12,17 C9.24,17 7,14.76 7,12 C7,9.24 9.24,7 12,7 C14.76,7 17,9.24 17,12 C17,14.76 14.76,17 12,17 Z M12,9 C10.34,9 9,10.34 9,12 C9,13.66 10.34,15 12,15 C13.66,15 15,13.66 15,12 C15,10.34 13.66,9 12,9 Z"
                        id="🔹-Icon-Color"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      width="22px"
                      height="16px"
                      viewBox="0 0 31 32"
                      xmlSpace="preserve"
                    >
                      <path
                        class="stone_een"
                        d="M31.488,17.932c0.35-0.572,0.388-1.278,0.096-1.882C30.291,13.381,25.83,6,16,6
                                        S1.709,13.381,0.416,16.051c-0.292,0.603-0.255,1.31,0.096,1.882c0.627,1.024,1.864,2.733,3.886,4.315l-1.424,1.697
                                        c-0.177,0.211-0.15,0.527,0.062,0.704h0c0.211,0.177,0.527,0.15,0.704-0.062l1.472-1.753c1.194,0.825,2.622,1.576,4.311,2.143
                                        l-0.835,2.292c-0.094,0.259,0.039,0.546,0.299,0.641l0,0c0.259,0.094,0.546-0.039,0.64-0.299l0.852-2.34
                                        c1.485,0.41,3.153,0.67,5.021,0.712V28.5c0,0.276,0.224,0.5,0.5,0.5h0c0.276,0,0.5-0.224,0.5-0.5v-2.517
                                        c1.868-0.042,3.536-0.303,5.021-0.712l0.852,2.34c0.094,0.259,0.381,0.393,0.64,0.299l0,0c0.259-0.094,0.393-0.381,0.299-0.641
                                        l-0.835-2.292c1.689-0.568,3.118-1.318,4.311-2.143l1.472,1.753c0.177,0.211,0.493,0.239,0.704,0.062l0,0
                                        c0.211-0.177,0.239-0.493,0.062-0.704l-1.424-1.697C29.624,20.665,30.861,18.956,31.488,17.932z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {formik.errors.password2 ? (
                <span className={style.errorMessage}>
                  *{formik.errors.password2}
                </span>
              ) : null}
            </div>
            <div className={style.btnContainer}>
              <button
                className={style.primaryBtn}
                type="submit"
                disabled={
                  Object.keys(formik.errors).length !== 0 ? true : false
                }
              >
                Create account
              </button>
              <span>Or</span>

              <GoogleSignIn />
            </div>

            <div className={style.linkToRegister}>
              Already have an account?
              <span>
                <Link className={style.Link} to="/login">
                  Log in
                </Link>
              </span>
            </div>
            <div className={style.contact}>
              *Any problem? Feel free to contact us at
              henry.pf.notifications@gmail.com
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
