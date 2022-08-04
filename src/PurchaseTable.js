import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Bootstrap imports
import Table from "react-bootstrap/Table";

// A comp that shows the purchases in a table.
// The criteria used to filter the table are taken from the route(params).
export default function PurchasesTableComp() {
  const storeData = useSelector((store) => store);
  const { cust, prod, date } = useParams();
  const [filteredPurchases, setPurchases] = useState([]);
  
  useEffect(() => {
    let purchases = storeData.Purchases;
    if (cust !== "-") {
      purchases = purchases.filter((purchase) => purchase.CustomerID === cust);
    }
    if (prod !== "-") {
      purchases = purchases.filter((purchase) => purchase.ProductID === prod);
    }
    if (date !== "-") {
      purchases = purchases.filter(
        (purchase) =>
          purchase.Date.toDate()
            .toString()
            .split(" ", 4)
            .slice(1, 4)
            .join("") === date
      );
    }
    setPurchases(purchases);
    //eslint-disable-next-line
  }, [cust, prod, date]);

  return (
    <div className="customers centered">
      <br></br>
      {filteredPurchases.length > 0 && (
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((purchase, index) => {
              let prod_i = storeData.Products.findIndex(prod => prod.id === purchase.ProductID)
              let customer_i = storeData.Customers.findIndex(cust => cust.id === purchase.CustomerID)

              return (
                <tr key={index}>
                  <td>{storeData.Customers[customer_i].FirstName+" "+storeData.Customers[customer_i].LastName}</td>
                  <td>{storeData.Products[prod_i].Name}</td>
                  <td>{purchase.Date.toDate().toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {filteredPurchases.length === 0 && (
        <h6>No Purchases were found, please change search criteria</h6>
      )}
    </div>
  );
}
