import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setSearchValue } from './uiSlice';
import { getProducts } from '@/services/productsService';
import { Product } from '@/types/Product';

interface ProductsState {
  productsList: Product[];
  productsFiltered: Product[];
  categories: string[];
  selectedCategory: string;
}

export const initialState: ProductsState = {
  productsList: [],
  productsFiltered: [],
  categories: [],
  selectedCategory: "",
};

// llama el servicio de axios para obtener los productos y los guarda en el estado global
export const fetchProducts = createAsyncThunk("data/fetchProducts", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(setLoading(true));
  const response = await getProducts() as Product[];
  //crea un array con las categorias de los productos Y Set evita que se repitan
  const categories = Array.from(new Set(response.map((product: Product) => product.category)));
  dispatch(setCategories(categories));
  dispatch(setProducts(response));
  dispatch(setLoading(false));
});

// filtra los productos por nombre y categoria
export const filterProducts = createAsyncThunk("data/filterProducts", async ({ searchValue, category }: { searchValue: string; category: string }, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(setSearchValue(searchValue));
  dispatch(setFilteredProducts({ searchValue, category }));
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.productsList = action.payload;
      state.productsFiltered = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setFilteredProducts: (state, action: PayloadAction<{ searchValue: string, category: string }>) => {
      const searchValue = action.payload.searchValue;
      const category = action.payload.category;
      state.selectedCategory = category;
      if (category === "") {
        state.productsFiltered = state.productsList.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase()));
      } else {
        state.productsFiltered = state.productsList.filter((product) => product.category === category && product.title.toLowerCase().includes(searchValue.toLowerCase()));
      }
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setNewProductList: (state, action: PayloadAction<Product>) => {
      state.productsList.push(action.payload);
      state.productsFiltered.push(action.payload);
    }
  },
});

export const {
  setProducts,
  setFilteredProducts,
  setCategories,
  setSelectedCategory,
  setNewProductList
} = productsSlice.actions;
export default productsSlice.reducer;
