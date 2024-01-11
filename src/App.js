import {useState, useEffect} from 'react'

import './App.css';

function App() {
  const storedProductList = JSON.parse(localStorage.getItem('productList'));

  const [list, setList] = useState(storedProductList);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleAddProduct = (productName, productPrice) => {
      let newProduct = {
        name: productName,
        price: productPrice
      }

      setList([...list, newProduct]);
      localStorage.setItem('productList', JSON.stringify([...list, newProduct]));
  }

  const handleDeleteSelectedItem = (index) => {
    let updatedList = [...list.slice(0, index), ...list.slice(index + 1)];

    setList(updatedList);
  }

  useEffect(() => {
    localStorage.setItem('productList', JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <header className="App-header">
          <h1>Smart form</h1>
          
        <div className='modal'>
          <div className='form-div'>
            <div className='input-div'>
              <p>Product Name</p>
              <input className='input' type="text" name='name' onChange={(e) => setProductName(e.target.value)}/>
            </div>
            <div className='input-div'>
              <p>Product Price</p>
              <input className='input' type="text" name='name' onChange={(e) => setProductPrice(e.target.value)}/>
            </div>
            <button className='submit-btn' type="submit" onClick={() => handleAddProduct(productName, productPrice)}>Submit</button>
            </div>
          <div className='todo-list'>
            {list.map((item, index) => (
              <div className='todo-item' key={index}>
                <div>
                  <span>{item.name}</span>
                <span>$ {item.price}</span>
                </div>
                <button className='delete-btn' onClick={() => handleDeleteSelectedItem(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
