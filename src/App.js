import { useState, useEffect } from "react";

import numeral from "numeral";

import "./App.css";

function App() {
  const storedProductList = JSON.parse(localStorage.getItem("productList"));

  const [list, setList] = useState(storedProductList);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleAddProduct = (productName, productPrice) => {
    const formattedPrice = numeral(productPrice).format("R$0,0.00");

    let newProduct = {
      name: productName,
      price: formattedPrice,
    };

    setList([...list, newProduct]);
    localStorage.setItem("productList", JSON.stringify([...list, newProduct]));
  };

  const handleDeleteSelectedItem = (index) => {
    let updatedList = [...list.slice(0, index), ...list.slice(index + 1)];

    setList(updatedList);
  };

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart form</h1>

        <div className="modal">
          <div className="form-div">
            <div className="input-div">
              <p>Product Name</p>
              <input
                className="input"
                type="text"
                name="name"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="input-div">
              <p>Product Price</p>
              <input
                className="input"
                type="text"
                name="name"
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={() => handleAddProduct(productName, productPrice)}
            >
              Submit
            </button>
          </div>
          <div className="todo-list">
            <scrollX>
              {list.map((item, index) => {
                console.log(index)
                if (index >= 0) {
                  return (
                    <div className="todo-item" key={index}>
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteSelectedItem(index)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                } else {
                  return <h1 className="no-item">Nenhum item</h1>;
                }
              })}
            </scrollX>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
