/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ItemProps {
  img: string;
  title: string;
  price: string;
  category: string;
}

const ListItem = (props: ItemProps) => {
  const { img, title, price, category } = props;
  return (
    <div className="flex flex-col md:flex-row items-start px-4 py-6 w-full">
      <figure className="w-full h-48 md:w-1/3 overflow-hidden rounded-md shadow-lg flex justify-center mb-4 select-none">
        <img src={img} alt={title} className="object-contain" />
      </figure>
      <div className="flex flex-col ml-0 md:ml-6 gap-3 w-full md:w-2/3">
        <h3 className="font-semibold text-2xl text-ellipsis whitespace-nowrap overflow-hidden">{title}</h3>
        <div className="flex items-center justify-start gap-3 w-full">
          <span className="text-lg font-bold">{price}</span>
          <span className="text-sm text-gray-500 ml-2">{category}</span>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
