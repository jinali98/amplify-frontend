import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const addTodo = async (todo) => {
    try {
      const response = await fetch(
        "https://gkzjy7ctt2.execute-api.us-east-1.amazonaws.com/dev/todos",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
          body: JSON.stringify({ todo }),
        }
      );
      const data = await response.json();
      console.log(data);
      setItems([...items, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    addTodo(item);
    // setItems([...items, item]);
    setItem("");
  };

  const inputChangeHandler = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {items.length > 0 &&
          items.map((item, index) => <p key={index}>{item}</p>)}

        <form onSubmit={formHandler}>
          <label>Todo</label>
          <input type="text" onChange={inputChangeHandler} value={item} />
          <button type="submit">Add</button>
        </form>
      </header>
    </div>
  );
}

export default App;
