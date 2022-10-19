import axios from "axios";

export function getAllSubscribers(currentUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://pf-henry-back.herokuapp.com/subscription/getAll`,
        {headers: { user: currentUser.accessToken}}
      );
      console.log(data)
      return dispatch({ type: "GET_ALL_SUBSCRIBERS", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function orderedBy(buttonName, orderType) {
    return ({ type: 'ORDERED_BY', payload: { buttonName, orderType } });
}
