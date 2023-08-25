import React, { useContext, useState } from "react";
import CartContext from "../Store/cart-context";

export default function HeaderCardButton(props) {
  const cartCtx = useContext(CartContext)
  const numberOfCartItems=cartCtx.items.reduce((curNumber,item)=>{
    return curNumber + item.amount;
  },0);
  return (
    <button onClick={props.onShowCard} className="btn btn-primary">
      <i class="fa-solid fa-cart-shopping"></i>
      <span>Your Cart</span>
      <span> {numberOfCartItems}</span>
    </button>
  );
}
 