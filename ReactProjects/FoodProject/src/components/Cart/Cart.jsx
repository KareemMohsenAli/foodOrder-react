import { useContext } from "react";
import ErrorModal from "../UI/ErrorModal"
import classes from "./Cart.module.css";
import CartContext from "../Store/cart-context";
import CartItem from "./CartItem";



const Cart = (props) => {
  const CtxData=useContext(CartContext)
  const totalAmount=`${CtxData.totalAmount.toFixed(2)};`
  const hasItem=CtxData.items.length>0
  const cartItemRemoveHandler=id=>{


  }
  const cartItemAddHandler=item=>{

  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
     {CtxData.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <ErrorModal onCloseCard={props.onCloseCard}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCard}>
          Close
        </button>
       {hasItem && <button className={classes.button}>Order</button>} 
      </div>
    </ErrorModal>
  );
};

export default Cart;
