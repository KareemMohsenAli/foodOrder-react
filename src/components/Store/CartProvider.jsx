import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCardState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD-ITEM") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // const existingCardItemsIndex = state.items.findIndex(
    //   (item) => item.id === action.item.id
    // );
    // const existingCardItems=state.items[existingCardItemsIndex]
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };


  }
  if(action.type==="CLEAR") {
    return defaultCardState
  }
  return defaultCardState;
};
export default function CardtProvider(props) {
  const [state, dispatch] = useReducer(cartReducer, defaultCardState);
  const addItemToCartHander = (item) => {
    dispatch({
      type: "ADD-ITEM",
      item: item,
    });
  };
  const removeItemFromCartHander = (id) => {
    dispatch({
      type: "REMOVE-ITEM",
      id: id,
    });
  };
  const clearCartHander = () => {
dispatch({type: "CLEAR"})
  }

  const cartConstext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemToCartHander,
    removeItem: removeItemFromCartHander,
    clearCart:clearCartHander
  };
  return (
    <CartContext.Provider value={cartConstext}>
      {props.children}
    </CartContext.Provider>
  );
}
