/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import useProducts from "@/hooks/useProducts";
import Link from "next/link";
import { LeftCircleOutlined } from "@ant-design/icons";

const ProductPage = () => {
  const { slug } = useParams();
  //trae la funcion findOneProduct del hook para obtener el producto
  const { findOneProduct } = useProducts();
  const product = findOneProduct(Number(slug));

  return (
    <div className="flex flex-col items-center justify-center w-full h-full" data-testid="product-detail-container">
      <Link href="/" className="absolute top-20 left-4 p-2 select-none">
        <LeftCircleOutlined /> Volver
      </Link>
      <div className="flex flex-col md:flex-row items-start justify-center w-full md:w-2/3 p-4">
          {product ? (
            <>
              <div className="flex flex-col items-center justify-center gap-4 w-full p-4 md:w-1/2 mt-6 md:mt-0" data-testid="product-image-section">
                <img src={product.image} alt={product.title} className="w-1/2 h-1/2" />
                <h2 className="text-2xl font-semibold">{product.title}</h2>
                <p className="text-lg">{`Precio: $${product.price}`}</p>
                <p className="text-sm text-gray-500">{`Categoría: ${product.category}`}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 p-4 w-full md:w-1/2" data-testid="product-description-section">
                <p className="text-lg">{product.description}</p>
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
