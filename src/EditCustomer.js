import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import firebase from "./firebaseApp"
import { useEffect, useState } from "react";



export default function EditCustomerComp() {

  const storeData = useSelector(store=>store);
  const params = useParams();
  const [customer, setCustomer] = useState({id: params.customerid, FirstName:"", LastName:"", City:""})
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [BProds,setBProds] = useState({});


  const setData = () =>{
    let i = storeData.Customers.findIndex(item => item.id === params.customerid)
    let cstmr = storeData.Customers[i]
    setCustomer({...customer, FirstName: cstmr.FirstName, LastName: cstmr.LastName, City: cstmr.City})
    let dict = {}
    storeData.Purchases.forEach(purchase =>{
      if(purchase.CustomerID === params.customerid){
        dict[purchase.ProductID] = 1;
      }
    })
    setBProds(dict)
  }

  const setUpdate = () =>{
    storeData.changeOnline? firebase.firestore().collection('Customers').doc(params.customerid).update(customer): console.log('simulated customer update');
    let NewCustomers = storeData.Customers
    let index = NewCustomers.findIndex(item => item.id===params.customerid)
    NewCustomers[index] = customer;
    dispatch({type: "EditCustomer", payload: NewCustomers})
  }
  
  const Delete = () =>{
    // Delete initially all the purchases of the customer we are about to delete
    storeData.Purchases.forEach(purchase =>{
      if(purchase.CustomerID===params.customerid){
        storeData.changeOnline? firebase.firestore().collection('Purchases').doc(purchase.id).delete(): console.log('simulated purchases deletion');
      }
    })
    //Calculate total purchases by reducing the 'purchases to delete' sum from the total purchases state.
    let NewPurchases = storeData.Purchases.filter(purchase => purchase.CustomerID!==params.customerid);
    let DeletedPurchases = storeData.Purchases.filter(purchase =>purchase.CustomerID===params.customerid)
    let sumToDecrease = 0
    DeletedPurchases.forEach(purchase =>{
      let prodindex = storeData.Products.findIndex(prod => prod.id === purchase.ProductID)
      sumToDecrease += Number(storeData.Products[prodindex].Price)
    })

    dispatch({type: "DeletePurchase", payload: NewPurchases})
    dispatch({type: "SetTotals", payload: storeData.TotalPurchases-sumToDecrease})
    
    // Now, we delete the customer himself
    storeData.changeOnline? firebase.firestore().collection('Customers').doc(params.customerid).delete(): console.log('simulated customer deletion');
    let NewCustomers = storeData.Customers.filter(item => item.id!==params.customerid)
    Navigate("/Customers")
    dispatch({type: "DeleteCustomer", payload: NewCustomers})
  }

  useEffect(() => {
    if(storeData.Customers.length>0){
      setData();
    }
    // eslint-disable-next-line
  },[storeData.Customers])

  return (
    <>
    <div className={"FullPageComp"}>
    <h1>Edit Customer Comp</h1>
    <h4>Please edit the desired customer properties and press "save changes"</h4>
      <Form className="EditForm centered">
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name: </Form.Label>
          <Form.Control type="text" placeholder={customer.FirstName} onChange={(e)=>setCustomer({...customer, FirstName: e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name: </Form.Label>
          <Form.Control type="text" placeholder={customer.LastName} onChange={(e)=>setCustomer({...customer, LastName: e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City: </Form.Label>
          <Form.Control type="text" placeholder={customer.City} onChange={(e)=>setCustomer({...customer, City: e.target.value})}/>
        </Form.Group>

        <Stack gap={2} direction="horizontal" className="centered">
          <Button variant="primary" type="button" onClick={() => setUpdate()}>
            Save Changes
          </Button>
          <Button variant="danger" type="button" onClick={() => Delete()}>
            Delete
          </Button>
        </Stack>
        <br></br><br></br>
        <h4>Products bought by {customer.FirstName + " " + customer.LastName}:</h4>

        <ListGroup className="mb-4">
          {
          Object.keys(BProds).map((prod,index)=>{
            let productindex = storeData.Products.findIndex(product => product.id === prod)
                return <Link to={"/EditProduct/"+storeData.Products[productindex].id} key={index}>
                  <ListGroup.Item action>
                {storeData.Products[productindex].Name}
              </ListGroup.Item>
            </Link>
            })
          }
        </ListGroup>

      </Form>
    </div>

    </>
  );
}