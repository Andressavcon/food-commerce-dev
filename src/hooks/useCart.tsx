import React from "react";
import { CartContext } from "../contexts/CartContext";

export function useCart(){
  return React.useContext(CartContext)
}
