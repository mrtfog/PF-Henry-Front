
export default function validateReview(values){

    let errors = {}

    if(values.description.trim() === '') errors.description = 'To send your review an opinion is required'
    
    return errors
}