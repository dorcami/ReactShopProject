import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import firebase from "./firebaseApp"


export default function EditProductComp() {
  const storeData = useSelector(store=>store);
  const params = useParams();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [Busers,setBUsers] = useState({});


  const [product, setProduct] = useState({id: params.productid, Name:"", Price:0, Quantity:0})

  const setData = () =>{
    let i = storeData.Products.findIndex(product => product.id === params.productid)
    let prod = storeData.Products[i]
    setProduct({...product, Name: prod.Name, Price: prod.Price, Quantity: prod.Quantity})
    let dict = {}
    storeData.Purchases.forEach(purchase =>{
      if(purchase.ProductID === params.productid){
        dict[purchase.CustomerID] = 1;
      }
    })
    setBUsers(dict)
  }

  const setUpdate = () =>{
    storeData.changeOnline? firebase.firestore().collection('Products').doc(params.productid).update(product): console.log('simulated product update');
    let NewProducts = storeData.Products
    let index = NewProducts.findIndex(product => product.id===params.productid)
    NewProducts[index] = product;
    dispatch({type: "EditProduct", payload: NewProducts})
  }
  
  const Delete = () =>{
    // Delete initially all the purchases of the product we are about to delete
    storeData.Purchases.forEach(purchase =>{
      if(purchase.ProductID===params.productid){
        storeData.changeOnline? firebase.firestore().collection('Purchases').doc(purchase.id).delete(): console.log('simulated purchases deletion');
      }
    })
    //Calculate total purchases by reducing the 'purchases to delete' sum from the total purchases state.
    let NewPurchases = storeData.Purchases.filter(purchase => purchase.ProductID!==params.productid);
    let before = storeData.Purchases.length;
    let after = NewPurchases.length;
    let i = storeData.Products.findIndex(product => product.id === params.productid)
    let price = storeData.Products[i].Price;
    dispatch({type: "DeletePurchase", payload: NewPurchases})
    dispatch({type: "SetTotals", payload: storeData.TotalPurchases-((before-after)*price)})
    
    // Now, we delete the product itself
    storeData.changeOnline? firebase.firestore().collection('Products').doc(params.productid).delete(): console.log('simulated product deletion');
    let NewProducts = storeData.Products.filter(product => product.id!==params.productid)
    Navigate("/Products")
    dispatch({type: "DeleteProduct", payload: NewProducts})
  }


  useEffect(() => {
    if(storeData.Products.length>0){
      setData();
    }
    // eslint-disable-next-line
  },[storeData.Products])


  return (
    <div className={"FullPageComp"}>
    <h1>Edit Products Comp</h1>
    <h4>Please edit the desired product properties and press "save changes"</h4>
      <Form className="EditForm centered">
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Name: </Form.Label>
          <Form.Control type="text" placeholder={product.Name} onChange={(e)=>setProduct({...product, Name: e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Price">
          <Form.Label>Price: </Form.Label>
          <Form.Control type="Number" placeholder={product.Price} onChange={(e)=>setProduct({...product, Price: e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Quantity">
          <Form.Label>Quantity: </Form.Label>
          <Form.Control type="Number" placeholder={product.Quantity} onChange={(e)=>setProduct({...product, Quantity: e.target.value})}/>
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
        <h4>Customers who bought this item:</h4>

        <ListGroup className="mb-4">
          {
          Object.keys(Busers).map((user,index)=>{
            let customerindex = storeData.Customers.findIndex(person => person.id === user)
                return <Link to={"/EditCustomer/"+storeData.Customers[customerindex].id} key={index}>
                  <ListGroup.Item action>
                {storeData.Customers[customerindex].FirstName+" "+storeData.Customers[customerindex].LastName}
              </ListGroup.Item>
            </Link>
            })
          }
        </ListGroup>

      </Form>
    </div>
  );
}