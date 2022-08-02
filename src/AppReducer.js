const AppReducer = (state={Products:[],Customers:[], Purchases:[], TotalPurchases: 0, changeOnline: false}, action) =>{

  switch(action.type){
        case 'LoadFromServer':
          return {...state, Products: action.payload[0], Customers: action.payload[1], Purchases: action.payload[2]}

        case 'SetTotals':
          return {...state, TotalPurchases: action.payload}

        case 'EditProduct':
          return{...state, Products: action.payload}

        case 'EditCustomer':
          return{...state, Customers: action.payload}

        case 'DeletePurchase':
          return{...state, Purchases: action.payload}

        case 'DeleteProduct':
        return{...state, Products: action.payload}

        case 'DeleteCustomer':
          return{...state, Customers: action.payload}
          
        case 'AddPurchase':
          return{...state, Purchases: [...state.Purchases, action.payload]}

        default:
          return state
      }
}

export default AppReducer;
