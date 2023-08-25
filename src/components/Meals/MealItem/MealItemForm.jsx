import React, { useRef, useState } from "react";

export default function MealItemForm(props) {
  const amountInputRef = useRef();
  const[amountIsValid,setAmountIsValid]=useState(true)
  // const [number, setnumber] = useState(0);
  // const changeInputHandler = () => {
  //   setnumber((prevCount) => {
  //     return prevCount + 1;
  //   });
  // };
  const SubmitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 ||enteredAmountNumber>5) {
      setAmountIsValid(false)
      return
    }
    props.onAddToCard(enteredAmountNumber)
  };
  return (
    <form onSubmit={SubmitHandler}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label me-3">
          Amount
        </label>
        <input
          ref={amountInputRef}
          step="1"
          min="1"
          max="5"
          defaultValue="1"
          style={{ width: "50px" }}
          type="number"
        />
        <button type="submit" className="btn btn-primary ms-2">
          Add
        </button>
        {!amountIsValid && <p>please enter a valid amount (1-5).</p>}
      </div>
      {/* <button onClick={changeInputHandler}>{number}+</button> */}
    </form>
  );
}
