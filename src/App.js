import './App.css';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
import firebase from "./firebaseApp"
import MenuComp from './Menu';
import RoutesComp from './Routes';


function App() {
  const dispatch = useDispatch();

// The Main function to collect all the data from the server! 

  const GetDataFromServer = async() =>{
    let prods = [];
    let cstms = [];
    let prchs = [];
    let total = 0;
    let temp = await firebase.firestore().collection('Products').get();
    temp.forEach(product=>{
      let obj = {id: product.id, Name: product.data().Name, Price: product.data().Price, Quantity: product.data().Quantity};
      prods.push(obj);});
      temp = await firebase.firestore().collection('Customers').get();
    temp.forEach(customer=>{
      let obj = {id: customer.id, FirstName: customer.data().FirstName, LastName: customer.data().LastName, City: customer.data().City};
      cstms.push(obj)});
      temp = await firebase.firestore().collection('Purchases').get();
    temp.forEach(purchase=>{
      let obj = {id: purchase.id, CustomerID: purchase.data().CustomerID, Date: purchase.data().Date, ProductID: purchase.data().ProductID};
      prchs.push(obj)});
      
        // A first calculation of the total sum of purchases - 
        // initial iteration is required, then for every purchase/deletion,
        // the sum will change accordingly without going all over the purchases again (to avoid iterations).
      prchs.forEach(purchase=>{
        let i = prods.findIndex(product => product.id === purchase.ProductID)
        total+=Number(prods[i].Price)
      })
      
    dispatch({type: "LoadFromServer", payload: [prods,cstms,prchs]})
    dispatch({type:"SetTotals", payload: total})
    }
    

  useEffect(()=>{
    GetDataFromServer();
    //eslint-disable-next-line
  },[])


  return (
      <div className="App">
        <MenuComp/>
        <RoutesComp/>
      </div>
  );
}

export default App;
