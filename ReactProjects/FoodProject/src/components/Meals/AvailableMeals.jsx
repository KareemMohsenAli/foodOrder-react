import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [httpError, sethttpError] = useState(null);
  useEffect(() => {
    setisLoading(true);
    fetch("https://react-http-61eb7-default-rtdb.firebaseio.com/meals.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        const meals = [];
        for (const key in data) {
          meals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setdata(meals);
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
        sethttpError(error.message);
      });
  }, []);
  const mealsList =
    data &&
    data.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        data
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-2">
        <div class="spinner-border " role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (httpError) {
    return (
      <div className="text-danger text-center mt-2">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
