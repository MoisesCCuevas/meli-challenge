/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useActionState } from "react";
import Select from "@components/Select";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import { createProduct } from "./actions";
import useProducts from "@hooks/useProducts";
import useAlert from "@/hooks/useAlert";
import { redirect } from "next/navigation";

const NuevoProductoPage: React.FC = () => {
  const { categories, addProduct } = useProducts();
  const [state, action, pending] = useActionState(createProduct, { error: "", newProduct: null });
  const { setAlert } = useAlert();

  // agrega el producto al estado global y redirige a la página de inicio
  useEffect(() => {
    if (state.newProduct) {
      setAlert({
        type: "success",
        title: "Producto Creado",
        children: <p>El producto fue creado correctamente</p>
      });
      addProduct(state.newProduct);
      redirect("/home");
    }
  }, [state.newProduct]);

  useEffect(() => {
    if (state.error) {
      setAlert({
        type: "error",
        title: "Error",
        children: <p>{state.error}</p>,
      });
    }
  }, [state.error]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4" data-testid="nuevo-producto-container">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>
      <form action={action} className="w-full md:w-1/4 flex flex-col gap-4" data-testid="nuevo-producto-form">
        <div className="mb-4 flex flex-col">
          <label htmlFor="name">Nombre del Producto:</label>
          <Input type="text" id="name" name="name" required disabled={pending} />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="description">Descripción:</label>
          <TextArea id="description" name="description" required disabled={pending} />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="price">Precio:</label>
          <Input type="number" id="price" name="price" required disabled={pending} />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="category">Categoría:</label>
          <Select
            defaultValue="Seleccionar Categoría"
            values={categories}
            id="category"
            name="category"
            required
            disabled={pending}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="image">Imagen:</label>
          <Input type="url" id="image" name="image" required disabled={pending} />
        </div>
        <button
          type="submit"
          className="bg-green-600 p-2 rounded-md text-white hover:bg-green-300"
          disabled={pending}
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default NuevoProductoPage;
