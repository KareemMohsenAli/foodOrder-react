import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/Store/CartProvider";
import ListMovies from "./Api/ListMovies";

function App() {
  const [carIsShown, setCardIsShown] = useState(false);
  const showCardHandler = () => {
    setCardIsShown(true);
  };
  const hideCardHandler = () => {
    setCardIsShown(false);
  };
  return (
    <CartProvider>
      {carIsShown && <Cart onCloseCard={hideCardHandler} />}
      <Header onShowCard={showCardHandler} />
      <main>
        <Meals />
      </main>

      {/* //working with some movies */}
      {/* <ListMovies /> */}
      {/* //working with some movies */}
    </CartProvider>
  );
}

export default App;
