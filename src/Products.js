import { useSelector } from "react-redux";
import ProductComp from "./Product";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export default function ProductsComp() {

  const storeData = useSelector(store => store);

  return (
    <div className={"FullPageComp"}>
            <h1><Badge bg="primary">Shop products</Badge></h1>
      <div className={"TotalPurchases"}>
        <Card className="text-center" bg="primary" text="light">
        <Card.Header>Purchases</Card.Header>
        <Card.Body>
          <Card.Title><h2>Total Amount of Purchases is {storeData.TotalPurchases} $</h2></Card.Title>

        </Card.Body>
      </Card>
        
      </div>
      <div className={"ProdsContainer"}>
      {
        storeData.Products.map(product => {
          return <ProductComp key={product.id} product={product}/>
        })
      }
      </div>
    </div>
  );
}