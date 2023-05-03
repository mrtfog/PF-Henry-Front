import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import style from '../../scss/components/Forms/_reviewForm.module.scss'
import validate from './validateReview'
import PopUpTemplate from "../common/PopUpTemplate";
import { postMovieReview, postWebsiteReview, setFormDisplay } from "../../redux/actions/reviews";
import { useFormik } from "formik";
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'


export default function Review() {

    const { currentUser } = useAuth()

    const {pathname} = useLocation()

    const display = useSelector(state => state.reviewsReducer.formDisplay)

    const movie = useSelector(state => state.moviesReducer.movieDetail)


    const formik = useFormik({

        initialValues: {

            userId: currentUser.uid,
            username: currentUser.displayName,
            stars: 1,
            description: "",  
        },
        validate,
        onSubmit:(values, {resetForm}) => {

            if(pathname.includes(`/movies/${movie.id}`)) dispatch(postMovieReview({...values, movieId: movie.id}, currentUser))
            else if(pathname.includes('/reviews')) dispatch(postWebsiteReview(values, currentUser))
            dispatch(setFormDisplay('none'))
            resetForm('')
            Swal.fire({
                text: 'Review submited successfully',
                icon: 'success',
                confirmButtonText: 'Continue',
                showCloseButton: true,
                iconColor: '#497aa6',
                allowEnterKey: false,
                customClass: {
                    popup: 'Alert',
                    closeButton: 'closeButton',
                    confirmButton: 'confirmButton',
                    denyButton: 'denyButton',
                }
            })
        }


    })

    const dispatch = useDispatch();

    function handleDisplay(){

        dispatch(setFormDisplay('none'))
        formik.values.stars = 1
        formik.values.description = ''
    }

    function getStars(num){
        let stars = ''

        while(num > 0){

            stars += '★'
            num--
        } 

        return stars
    }

    function formDiv(){

        return(

            <div className={style.form_container}>

                { pathname.includes(`/movies/${movie.id}`) ? <h2>Add review for <span>'{movie.title}'</span></h2> : <h2>Add your review</h2>}

                <hr></hr>
  
                <div>
                    <span className={style.stars}>{getStars(formik.values.stars)}</span>
                    <label>Stars: {formik.values.stars}/10</label>
                    <input type='range' name='stars' min='1' max='10' value={formik.values.stars} onChange={formik.handleChange} />
                </div>

                <div>
                    <label>Review: {formik.errors.description ? <span>{formik.errors.description}</span> : null}</label>
                    <textarea maxLength='1000' name='description' value={formik.values.description} onChange={formik.handleChange} />
                </div>

                <button onClick={formik.handleSubmit} disabled={formik.values.description.trim() === '' ? true : false}>Submit</button>
              
            </div>
        )
    }

    return(
        <PopUpTemplate displayState={display} handleOnClose={() => handleDisplay()} content={formDiv()}/>
    );
}
