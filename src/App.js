import React, {useState, Fragment} from "react";
import {nanoid} from 'nanoid';
import './App.css';
import data from "./store-data.json";
import ReadOnlyRow from "./Components/ReadOnlyRow";
import EditableRow from "./Components/EditableRow";

const App = () => {
  const [products, setProducts] = useState(data);
  const [addFormData, setAddFormData] = useState({Item:" ", Price:" ", Quantity:" "});

  const [editFormData, setEditFormData] = useState({Item:" ", Price:" ", Quantity:" "});
  
  const [editProductId, setEditProductId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldname = event.target.getAttribute('name');
    const fieldvalue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldname] = fieldvalue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) =>{
    event.preventDefault();

    const fieldname = event.target.getAttribute('name');
    const fieldvalue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldname] = fieldvalue;

    setEditFormData(newFormData);

  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newProduct= {
      id: nanoid(),
      Item: addFormData.Item,
      Price:addFormData.Price,
      Quantity:addFormData.Quantity,
    };

    const newProducts = [...products, newProduct];
    setProducts(newProducts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedProduct= {
      id: nanoid(),
      Item: editFormData.Item,
      Price:editFormData.Price,
      Quantity:editFormData.Quantity,
    };

    const newProducts = [...products];
    const index = products.findindex((product) => product.id === editProductId);
    newProducts[index] = editedProduct;
    setProducts(newProducts);
    setEditProductId(null);
  };

  const handleEditClick = (event, product) => {
    event.preventDefault();
    setEditProductId(product.id);

    const formvalues = {
      Item: product.Item,
      Price:product.Price,
      Quantity:product.Quantity,
    };

    setEditFormData(formvalues);
  };

  const handleCancelClick = () => {
    setEditProductId(null);
  };

  const handleDeleteClick = (productId) =>{
    const newProducts = [...products];
    const index = products.findindex((product) => product.id === editProductId);
    newProducts.splice(index, 1);
    setProducts(newProducts);
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product)=>(
            <Fragment>
              {editProductId === product.id ? 
              (<EditableRow 
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}/>):
              (<ReadOnlyRow 
                product={product}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}/>)}
           </Fragment>
          ))}
        </tbody>
      </table>
      </form>

      <h2>Add item</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="Item" required="required" placeholder="Enter a item" onChange={handleAddFormChange}/>
        <input type="text" name="Price" required="required" placeholder="Enter a Price" onChange={handleAddFormChange}/>
        <input type="text" name="Quantity" required="required" placeholder="Enter a Quantity" onChange={handleAddFormChange}/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
