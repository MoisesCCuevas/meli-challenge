import React from "react";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full h-16 p-2 shadow-md select-none">
      <ul className="flex items-center justify-center gap-6">
        <li>
          <h1 className="font-extrabold text-2xl">Meli Challenge</h1>
        </li>
        <li className="hover:cursor-pointer hover:text-cyan-50">
          <Link href="/">Products</Link>
        </li>
      </ul>
      <button className="border font-bold py-2 px-4 rounded-md hover:text-white hover:border-white">
        <Link href="/products/nuevo-producto" className="flex items-center justify-center md:gap-2">
          <PlusOutlined />
          <span className="hidden md:flex">Agregar Producto</span>
        </Link>
      </button>
    </nav>
  );
}

export default Navbar;
