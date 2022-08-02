import {Route, Routes} from "react-router-dom";


//pages
import CustomersComp from "./Customers";
import EditCustomerComp from "./EditCustomer";
import EditProductComp from "./EditProduct";
import LoginComp from "./Login";
import ProductsComp from "./Products";
import PurchasesComp from "./Purchases";
import PurchasesTableComp from "./PurchaseTable";

export default function RoutesComp() {

   return (
    <Routes>
    <Route path="/ReactShopProject" element={<LoginComp/>}></Route>
    <Route path="/Products" element={<ProductsComp/>}></Route>
    <Route path="/Customers" element={<CustomersComp/>}></Route>
    <Route path="/Purchases" element={<PurchasesComp/>}>
      <Route path=":cust$:prod$:date" element={<PurchasesTableComp/>}></Route>;
    </Route>
    <Route path="/EditCustomer" element={<EditCustomerComp/>}>
      <Route path=":customerid" element={<EditCustomerComp/>}></Route>
    </Route>
    <Route path="/EditProduct" element={<EditProductComp/>}>
      <Route path=":productid" element={<EditProductComp/>}></Route>
    </Route>
  </Routes>
   );
}
