/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import useProducts from "@/hooks/useProducts";
import Link from "next/link";
import { LeftOutlined } from "@ant-design/icons";

const ProductPage = () => {
  const { slug } = useParams();
  //trae la funcion findOneProduct del hook para obtener el producto
  const { findOneProduct } = useProducts();
  const product = findOneProduct(Number(slug));

  return (
    <div className="flex flex-col items-center justify-center w-full h-full" data-testid="product-detail-container">
      <Link href="/" className="w-full md:w-fit relative md:absolute md:top-20 md:left-4 p-4 select-none text-xl font-semibold hover:text-blue-500">
        <LeftOutlined /> Volver
      </Link>
      <div className="flex flex-col md:flex-row items-start justify-center w-full md:w-2/3 p-4">
          {product ? (
            <>
              <div className="flex flex-col items-center justify-center w-full p-4 md:w-1/2 select-none" data-testid="product-image-section">
                <img src={product.image} alt={product.title} className="w-1/2 h-1/2" />
              </div>
              <div className="flex flex-col items-center justify-center gap-6 p-4 w-full md:w-1/2" data-testid="product-description-section">
                <h2 className="text-3xl font-semibold">{product.title}</h2>
                <p className="text-lg w-full rounded-md bg-blue-500 text-white shadow-md p-2 flex items-center justify-center">{`Precio: $${product.price}`}</p>
                <p className="text-sm text-gray-500 ">{`Categoría: ${product.category}`}</p>
                <p className="text-lg border-t-2 pt-6">{product.description}</p>
              </div>
            </>
          ) : (
            <p className="text-lg w-full p-10">No se encontró el producto</p>
          )}
      </div>
    </div>
  );
}

export default ProductPage;
