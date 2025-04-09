"use client";

import React from "react";
import { Product } from "@/types/Product";
import useProducts from "@/hooks/useProducts";
import ListItem from "@/components/ListItem";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";
import Link from "next/link";

const Home = () => {
  const {
    loading,
    productsFiltered,
    categories,
    selectedCategory,
    searchValue,
    filterProductsList
  } = useProducts();
  
  // muestra un mensaje de carga mientras se cargan los productos
  if (loading) return <div className="p-7">Cargando Productos...</div>
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-2/3 p-2 gap-3 select-none">
        <SearchInput value={searchValue} onChange={v => filterProductsList(v, selectedCategory)} />
        <Select
          filter
          value={selectedCategory}
          defaultValue="Filtrar"
          values={categories}
          onChange={v => filterProductsList(searchValue, v)}
        />
      </div>
      {productsFiltered.length > 0 ? productsFiltered.map((product: Product) => (
        <Link key={product.title} href={`/products/${product.id}`} className="w-full md:w-3/5">
          <ListItem
            img={product.image}
            title={product.title}
            price={`$${product.price}`}
            category={product.category}
          />
        </Link>
      )) : (
        <div className="p-7">No hay productos que mostrar</div>
      )}
    </div>
  );
}

export default Home;
