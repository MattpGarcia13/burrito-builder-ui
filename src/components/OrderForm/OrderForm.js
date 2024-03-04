import "./OrderForm.css";
import { useState } from "react";

function OrderForm({ addOrders }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function inputIngredient(ingredient) {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  }

  function changeUserInput(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    if (name.trim() === "" || ingredients.length === 0) {
      alert("Please enter a name and select at least one ingredient before submitting.");
    } else {
      const newOrder = {
        id: Date.now(),
        name: name,
        ingredients: ingredients,
      };

      addOrders(newOrder);

      clearInputs();
    }

    event.preventDefault();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient) => (
    <button className={ingredient +'-button'}
      key={ingredient}
      type='button'
      name={ingredient}
      onClick={() => inputIngredient(ingredient)}
    >
      {ingredient}
    </button>
  ));

  return (
    <form onSubmit={handleSubmit}>
      <input className='form-name'
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={changeUserInput}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button className='submit-button' type="submit">Submit Order</button>
    </form>
  );
}

export default OrderForm;
