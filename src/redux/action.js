import * as actions from "./constant";


export const setLogin=(payload)=>{
return{
  type:actions.LOGIN,
  payload
}
}
export const addItem =(payload)=>{
  return{
      type: actions.ADD_ITEM,
      payload
  }
}

export const deleteItem = (payload) => {
  return {
    type: actions.DELETE_ITEM,
    payload
  };
};

