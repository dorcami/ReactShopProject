import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import BuyProduct from './BuyProduct';


export default function CustomersComp() {
  const storeData = useSelector(store=>store);
  const [selectedUser, setUser] = useState("");

  return (
    <div className={"FullPageComp"}>
      <h1><Badge bg="primary">All shop customers</Badge></h1><br></br>
    <div className="customers centered">
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Products Bought</th>
          <th>Purchases Dates</th>
          <th>Buy Product</th>
        </tr>
      </thead>
      <tbody>
        {
          storeData.Customers.map((customer,index)=>{
            return <tr key={index}>
              <td>{index}</td>
              <td>{customer.FirstName+" "+customer.LastName}</td>
              <td>
                {
                  storeData.Purchases.filter(purchase=> purchase.CustomerID===customer.id).map((purchase, index)=>{
                    let i = storeData.Products.findIndex(prod => prod.id === purchase.ProductID)
                    return <Link to={"/EditProduct/"+storeData.Products[i].id} key={index}><h6>{storeData.Products[i].Name}</h6></Link>
                  })
                }
              </td>
              <td>
              {
                  storeData.Purchases.filter(purchase=> purchase.CustomerID===customer.id).map((purchase,index)=>{
                    let date = purchase.Date.toDate().toString();
                    date = date.substring(0, date.indexOf('('));
                    return <h6 key={index}>{date}</h6>
                  })
                }
              </td>
              <td>
                <Button variant="primary" type="button" onClick={() => setUser(customer.id)}>
                Buy a product
                </Button>
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
    
    </div>
    <BuyProduct user={selectedUser}/>
    </div>
  );
}