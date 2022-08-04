import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import firebase from "./firebaseApp"
// Bootstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default function BuyProduct(props) {
  const storeData = useSelector(store=>store);
  const dispatch = useDispatch();
  const [prodToBuy,setProd] = useState("");
  
  // a function that sends a purchase to the server and to redux store as well.
  // In addition, it updates the purchases total sum
  const addPurchase = () =>{
    let timenow = firebase.firestore.Timestamp.fromDate(new Date())
    let obj = {Date: timenow, CustomerID: props.user, ProductID: prodToBuy}
    storeData.changeOnline? firebase.firestore().collection('Purchases').doc().set(obj): console.log('simulated purchase created');
    let i = storeData.Products.findIndex(product => product.id === prodToBuy)
    let price = Number(storeData.Products[i].Price);
    dispatch({type: "SetTotals", payload: storeData.TotalPurchases+price})
    dispatch({type: "AddPurchase", payload: obj})


  }

  return (
    <div className={"FullPageComp"}>
    {
      props.user && (
        <div className={"EditForm centered"}>
          <Form.Select aria-label="Default select example" onChange={(e) => setProd(e.target.value)}>
            <option>Please select a product</option>
            {storeData.Products.map(item => {
              return <option key={item.id} value={item.id}>{item.Name}</option>
            })}
          </Form.Select><br></br>
          <Button variant="primary" type="button" onClick={() => addPurchase()}>
            Complete Purchase
          </Button>
        </div>
      )
        
    }
    </div>
  );
}