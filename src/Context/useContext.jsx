import { CreateStateContext,CartDispatchContext } from "./createContext";
import { useContext } from "react";
export const useCart = ()=>useContext(CreateStateContext);
export const useDispatchCart = ()=>useContext(CartDispatchContext);