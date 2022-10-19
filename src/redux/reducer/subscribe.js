const initialState = {
  allSubscribers: [],
};

export default function subscribeReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_SUBSCRIBERS":
      return {
        ...state,
        allSubscribers: action.payload,
      };
    
      case "ORDERED_BY":
        const { buttonName, orderType } = action.payload;
        let orderedSubscriptions;

        if (buttonName === "amount" && orderType === false) {
            orderedSubscriptions = state.allSubscribers.sort(function (a, b) {
                if (parseInt(a.payments[a.payments.length-1].price) > parseInt(b.payments[b.payments.length-1].price)) return -1;
                if (parseInt(a.payments[a.payments.length-1].price) < parseInt(b.payments[b.payments.length-1].price)) return 1;
                else return 0;
            });
        } else if (buttonName === "amount" && orderType === true) {
            orderedSubscriptions = state.allSubscribers.sort(function (a, b) {
                if (parseInt(a.payments[a.payments.length-1].price) > parseInt(b.payments[b.payments.length-1].price)) return 1;
                if (parseInt(a.payments[a.payments.length-1].price) < parseInt(b.payments[b.payments.length-1].price)) return -1;
                else return 0;
            });
        }

        if (buttonName === "date" && orderType === false) {
            orderedSubscriptions = state.allSubscribers.sort(function (a, b) {
                if (a.payments[a.payments.length-1].dateTime > b.payments[b.payments.length-1].dateTime) return -1;
                if (a.payments[a.payments.length-1].dateTime < b.payments[b.payments.length-1].dateTime) return 1;
                else return 0;
            });
        } else if (buttonName === "date" && orderType === true) {
            orderedSubscriptions = state.allSubscribers.sort(function (a, b) {
                if (a.payments[a.payments.length-1].dateTime > b.payments[b.payments.length-1].dateTime) return 1;
                if (a.payments[a.payments.length-1].dateTime < b.payments[b.payments.length-1].dateTime) return -1;
                else return 0;
            });
        }

        if (buttonName === "type" && orderType === false) {
            orderedSubscriptions = state.allSubscribers.sort(function (a, b) {
                if (a.deleted > b.deleted) return -1;
                if (a.deleted < b.deleted) return 1;
                else return 0;
            });
        } else if (buttonName === "type" && orderType === true) {
            orderedSubscriptions = state.allSubscribers.sort(function (a, b) {
                if (a.deleted > b.deleted) return 1;
                if (a.deleted < b.deleted) return -1;
                else return 0;
            });
        }

        return {
            ...state,
            allSubscribers: orderedSubscriptions,
        };


    default:
      return {
        ...state,
      };
  }
}
