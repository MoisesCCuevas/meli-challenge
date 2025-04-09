"use client";

import { useEffect } from "react";
import { fetchProducts, filterProducts, setNewProductList } from "@store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { AppDispatch } from "@store/index";
import { Product } from "@/types/Product";

const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsFiltered, categories, selectedCategory, productsList } = useSelector((state: RootState) => state.products);
  const { loading, searchValue } = useSelector((state: RootState) => state.ui);

  //trae los productos de fake API y los guarda en el estado global si no existen
  useEffect(() => {
    if(productsList.length === 0) dispatch(fetchProducts());
  }, [dispatch, productsList.length]);

  //filtra los productos por nombre y categoria
  const filterProductsList = (searchValue: string, category: string) => {
    dispatch(filterProducts({searchValue, category}));
  };

  //busca un producto por id
  const findOneProduct = (id: number) => {
    const product = productsFiltered.find((product) => product.id === id);
    return product;
  };

  //agrega un producto al estado global
  const addProduct = (product: Product) => {
    dispatch(setNewProductList(product));
  }

  return {
    productsFiltered,
    categories,
    selectedCategory,
    loading,
    searchValue,
    filterProductsList,
    findOneProduct,
    addProduct
  };
};

export default useProducts;
