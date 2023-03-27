import * as actions from "./constant";
const initialState = {
  edit: false,
  items:
    (localStorage.contacts && JSON.parse(localStorage.getItem("contacts"))) ||
    [],
  item: [],
};
const items = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ITEM:
      let locMrth = localStorage.contacts
        ? JSON.parse(localStorage.contacts)
        : [];
      let data = action.payload;
      let check = locMrth.findIndex((x) => x.id === action.payload.id);
      if (locMrth.length === 0) {
        data.itemId = 1;
      } else if (check !== -1) {
        locMrth[check].qnt = locMrth[check].qnt + 1;
      } else if(locMrth.length !== 0) {
        data.id = locMrth[locMrth.length - 1].itemId + 1;
      }
      check === -1 && locMrth.unshift(data);
      localStorage.setItem("contacts", JSON.stringify(locMrth));
      return { ...state, items: locMrth };
    case actions.DELETE_ITEM:
      let locDelete = [...state.items];
      let chek1 = locDelete.findIndex((x) => x.id === action.payload.id);
      locDelete.splice(chek1, 1);
      localStorage.setItem("contacts", JSON.stringify(locDelete));
      return {
        ...state,
        items: locDelete,
      };
    case actions.LOGIN:
      localStorage.setItem("authTask", JSON.stringify(action.payload));
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default items;
