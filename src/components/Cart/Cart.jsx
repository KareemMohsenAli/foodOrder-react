import { useContext, useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import classes from "./Cart.module.css";
import CartContext from "../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const[didsubmit,setDidsubmit] = useState(false);
  const [CheckOrder, setCheckOrder] = useState(false);
  const CtxData = useContext(CartContext);
  const totalAmount = `${CtxData.totalAmount.toFixed(2)};`;
  const hasItem = CtxData.items.length > 0;
  const cartItemRemoveHandler = (id) => {};
  const cartItemAddHandler = (item) => {};
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
  const OrderHandler = () => {
    setCheckOrder(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-61eb7-default-rtdb.firebaseio.com/user.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: CtxData.items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsSubmitting(false);
    setDidsubmit(true)
    CtxData.clearCart()
  };


  const cartModelContent=
  <>
  {cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {CheckOrder && (
    <Checkout onSumbit={submitOrderHandler} onCancel={props.onCloseCard} />
  )}
  {!CheckOrder && (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.onCloseCard}
      >
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={OrderHandler}>
          Order
        </button>
      )}
    </div>
  )}
</>
  const isSubmittingModalContent = <div className="d-flex justify-content-center">
    <div class="spinner-border text-warning" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

    const didSubmitModalContent=<p  className="text-center">Successfully sent the order!</p>

  return (
    <ErrorModal onCloseCard={props.onCloseCard}>
    {!isSubmitting && !didsubmit  && cartModelContent }
    {isSubmitting &&isSubmittingModalContent }
    { !isSubmitting&& didsubmit &&didSubmitModalContent}
    </ErrorModal>
  );
};

export default Cart;
