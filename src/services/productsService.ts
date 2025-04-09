import axios from "axios";
import { Product } from "../types/Product";

const API = axios.create();

//trae los productos de fake API
export const getProducts = async () => {
  const response = await API.get("https://fakestoreapi.com/products");
  return response.data;
}

//llama a la fake API para crear un nuevo producto y retorna el producto creado
export const setNewProduct = async (product: Partial<Product>) => {
  const response = await API.post("https://fakestoreapi.com/products", product);
  return response.data;
}