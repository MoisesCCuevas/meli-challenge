import { setNewProduct } from "@/services/productsService";

//recibe el estado anterior y los datos del formulario para crear un nuevo producto
export const createProduct = async (prev: unknown, data: FormData) => {
  const price = Number(data.get("price"));
  //si el precio es negativo, retorna un error
  if (isNaN(price) || price < 0) {
    return { error: "El precio no puede ser negativo", newProduct: null };
  }
  //crea el objeto con los datos del formulario
  const body = {
    title: data.get("name") as string,
    price: price,
    description: data.get("description") as string,
    category: data.get("category") as string,
    image: data.get("image") as string,
  };
  const response = await setNewProduct(body);
  return { error: "", newProduct: response };
};