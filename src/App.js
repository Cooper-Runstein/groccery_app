import './App.css';

import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import {listItems} from "./graphql/queries"
import {createItem, deleteItem} from "./graphql/mutations"

import awsExports from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react'
Amplify.configure(awsExports);



function App() {

  const fetchItems = async () =>{
    const itemData = await API.graphql(graphqlOperation(listItems))
    const items = itemData.data.listItems.items
    setState(p => ({...p, items}))
  }

  useEffect(() => {
    fetchItems();
  }, [])



  const [state, setState] = useState({
    inputName: "",
    inputDescription: "",
    inputQuantity: 1,
    items: []
  })


  const updateItemName = e => setState(p => ({...p, inputName: e.target.value })) 
  const updateItemDescription = e => setState(p => ({...p, inputDescription: e.target.value })) 
  const updateItemQuantity = e => setState(p => ({...p, inputQuantity: e.target.value })) 

  async function addItem() {

    const item = {
      name: state.inputName,
      description: state.inputDescription,
      quantity: state.inputQuantity
    }

    try {
      await API.graphql(graphqlOperation(createItem, {input: item}))
      await fetchItems()
    } catch (err) {
      console.log('error creating item:', err)
    }
  }

  async function deleteItemReq(item) {

    try {
      await API.graphql(graphqlOperation(deleteItem, {input: {id: item.id}}))
      await fetchItems()
    } catch (err) {
      console.log('error creating item:', err)
    }
  }

  return (
    <div className="App">
      <div style={{width: "500px", margin: "auto"}}>
        <h3>Add Item</h3>
        <div><span>Item: </span><input onChange={updateItemName} value={state.inputName} /></div>
        <div><span>Description: </span><input onChange={updateItemDescription} value={state.inputDescription} /></div>
        <div><span>Quantity: </span><input onChange={updateItemQuantity} value={state.inputQuantity} /></div>
        <div><button onClick={addItem}>Add</button></div>
       
        <div>
          {state.items.map(item => {
            return <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
              <h4>{item.name}</h4><p>{item.description}</p><p>{item.quantity}</p><button onClick={() => deleteItemReq(item)}>Delete</button>
            </div>
          })}
        </div>
      </div>
      <div>
      
      </div>
    </div>
  );
}

export default withAuthenticator(App);
