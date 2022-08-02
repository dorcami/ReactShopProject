import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomDatePicker from "./Custom-Datepicker";
import { Outlet, useNavigate } from 'react-router-dom';


export default function PurchasesComp() {
  
  const storeData = useSelector(store=>store);
  const [prodToSearch,setProd] = useState("-");
  const [customerToSearch,setCustomer] = useState("-");
  const [date, setDate] = useState("");
  const Navigate = useNavigate();

  const searchPurchase = (prod, cust, dat) => {
    let date=dat
    if(date===""){date="-"}
    else if(date===undefined){date="-"}
    else{date=date.toString().split(" ",4).slice(1,4).join("")}
    Navigate('/Purchases/'+cust+'$'+prod+'$'+date)
  }

  return (
    <div className={"FullPageComp"}>
      <h1><Badge bg="primary">Search for purchases</Badge></h1><br></br>
        <div className={"EditForm centered"}>
          <Form.Select aria-label="Default select example" onChange={(e) => setCustomer(e.target.value)}>
            <option value="-">Customer</option>
            {storeData.Customers.map(item => {
              return <option key={item.id} value={item.id}>{item.FirstName+" "+item.LastName}</option>
            })}
          </Form.Select><br></br>
          <Form.Select aria-label="Default select example" onChange={(e) => setProd(e.target.value)}>
            <option value="-">Product</option>
            {storeData.Products.map(item => {
              return <option key={item.id} value={item.id}>{item.Name}</option>
            })}
          </Form.Select><br></br>
          <div className={"Datesearch"}>
          Select Date:
          <CustomDatePicker
          wrapperClassName="datepicker"
          className="form-control"
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(d) => setDate(d)}
        />
          <Button variant="primary" type="button" onClick={() => setDate()}>
            Reset
          </Button>
          </div><br></br><br></br>
          <Button variant="primary" type="button" onClick={() => searchPurchase(prodToSearch, customerToSearch, date)}>
            Search Purchase
          </Button>
        </div>
        <Outlet/>
    </div>
  );
}