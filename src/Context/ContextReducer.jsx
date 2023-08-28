import {  useReducer } from "react";
import PropTypes from "prop-types";
import { CartDispatchContext,CreateStateContext } from "./createContext";
const reducer = (state,action)=>{
  let newArr;
  let empArray;
  let arr;


 switch(action.type){
    case 'ADD':
        return [...state,{id:action.id,name:action.name,price:action.price,qty:action.qty,size:action.size,}]

        case 'DELETE':
             newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        
            case "DROP":
                empArray = []
                return empArray
                
            case "UPDATE":
                arr = [...state]
                arr.find((food, index) => {
                    if (food.id === action.id) {
                        console.log(food.qty, parseInt(action.qty), action.price + food.price)
                        arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price}
                    }
                    return arr
                })
                return arr

        
        default:
            return console.log('error in reducer')
 }
}
export const CartProvider =({children})=>{
    const [state,dispatch]=useReducer(reducer,[]);
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CreateStateContext.Provider value={state}>
                {children}
            </CreateStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

CartProvider.propTypes={
    children:PropTypes.node.isRequired,
}