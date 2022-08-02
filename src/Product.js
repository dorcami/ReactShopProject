import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import { useDispatch, useSelector } from "react-redux";
import firebase from "./firebaseApp"
import { useEffect, useState } from "react";


export default function ProductComp(props) {
  const [buying_customers, setCustomers] = useState({});
  const storeData = useSelector((store) => store);
  const dispatch = useDispatch();
  const [prodToBuy,setProd] = useState("");

  useEffect(() => {
    let dict = {}
    storeData.Purchases.forEach(purchase =>{
      if(purchase.ProductID === props.product.id){
        dict[purchase.CustomerID] = [];
      }
    })
    Object.keys(dict).forEach(customer =>{
      storeData.Purchases.forEach(purchase => {
        if(purchase.CustomerID===customer && purchase.ProductID===props.product.id){
          dict[customer].push(purchase.Date.toDate().toString().split(" ",5).join(" "))
        }
      })
    })
    setCustomers(dict)
    // eslint-disable-next-line
  },[storeData.Purchases])

  const addPurchase = (id) =>{
    let timenow = firebase.firestore.Timestamp.fromDate(new Date())
    let obj = {Date: timenow, CustomerID: id, ProductID: prodToBuy}
    storeData.changeOnline? firebase.firestore().collection('Purchases').doc().set(obj): console.log('simulated purchase created');
    dispatch({type: "AddPurchase", payload: obj})
    let i = storeData.Products.findIndex(product => product.id === prodToBuy)
    let price = Number(storeData.Products[i].Price);
    dispatch({type: "SetTotals", payload: storeData.TotalPurchases+price})


  }

  const popover = (name,id) => {
    return (
    <Popover id="popover-contained">
      <Popover.Header as="h3">Add Products for {name}</Popover.Header>
      <Popover.Body>
      <div className={"EditForm centered flexcol"}>
          <Form.Select aria-label="Default select example" onChange={(e) => setProd(e.target.value)}>
            <option>Please select a product</option>
            {storeData.Products.map(item => {
              return <option key={item.id} value={item.id}>{item.Name}</option>
            })}
          </Form.Select><br></br>
          <Button variant="primary" type="button" onClick={() => addPurchase(id)}>
            Complete Purchase
          </Button>
        </div>
      </Popover.Body>
    </Popover>
    )
  };

  return (
    <div className="Product">
      <Card>
        <Card.Header as="h5">
          <Link to={"/EditProduct/" + props.product.id}>
            <h4>{props.product.Name}</h4>
          </Link>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Price: {props.product.Price} $
          </Card.Title>
          <Card.Text>
            {props.product.Quantity} pieces in stock
          </Card.Text>
        </Card.Body>

        <h6>Buying customers:</h6>
        <Accordion>
          {
            Object.keys(buying_customers).map((customer,index)=>{
              let id = storeData.Customers.findIndex(cust => cust.id === customer)
              return (          
              <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{storeData.Customers[id].FirstName+" "+storeData.Customers[id].LastName}</Accordion.Header>
              <Accordion.Body>
              <Link to={"/EditCustomer/" + customer}>
              Edit {storeData.Customers[id].FirstName+" "+storeData.Customers[id].LastName}
              </Link><br></br><br></br>
              <h6>Purchase dates:</h6>
                {
                  buying_customers[customer].map((date,index) =>{
                    return <dd key={index}>{date}</dd>
                  })
                }
                <OverlayTrigger key={"top"} trigger="click" placement="top" overlay={popover(storeData.Customers[id].FirstName,customer)} rootClose="true">
                  <Button>Add Product</Button>
                </OverlayTrigger>
              </Accordion.Body>
            </Accordion.Item>)
            })
          }
        </Accordion>
      </Card>
    </div>
  );
}
