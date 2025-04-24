import { create } from "zustand";

export interface ProductInfo {
  _id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  imageUrl?: string;
}

export interface ProductState {
  products: any[];
  setProducts: (products: any[]) => void;
  fetchProducts: () => Promise<void>;
  createProduct: (
    data: ProductInfo
  ) => Promise<{ res: boolean; message: string; data: any } | undefined>;
  updateProduct: (
    id: string,
    updateProduct: ProductInfo
  ) => Promise<{ res: boolean; message: string; data: any } | undefined>;
  deleteProduct: (
    id: string
  ) => Promise<{ res: boolean; message: string } | undefined>;
  deleteAllProducts: () => Promise<
    { res: boolean; message: string } | undefined
  >;
}

const useProductStore = create<ProductState>()((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  fetchProducts: async () => {
    const res = await fetch("api/product");
    const data = await res.json();
    set({ products: data.data });
  },
  createProduct: async (newProduct) => {
    console.log("createProduct data: ", newProduct);
    const res = await fetch("api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    console.log("createProduct data: ", data);
    if (data.res) {
      set((state) => ({
        products: [...state.products, data.data],
      }));
    }
    return { res: data.res, message: data.message, data: data.data };
  },
  updateProduct: async (id: string, updateProduct: ProductInfo) => {
    console.log("updateProduct data: ", updateProduct);
    console.log("updateProduct id: ", id);

    const res = await fetch(`api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });
    const data = await res.json();
    console.log("updateProduct data: ", data);
    if (data.res) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
      }));
    }
    return { res: data.res, message: data.message, data: data.data };
  },
  deleteProduct: async (id: string) => {
    const res = await fetch(`api/product/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    console.log("deleteProduct data: ", data);

    if (data.res) {
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
    }
    return { res: data.res, message: data.message };
  },
  deleteAllProducts: async () => {
    const res = await fetch("api/product/all", {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("deleteAllProduct data: ", data);
    if (data.res) {
      set({ products: [] });
    }
    return { res: data.res, message: data.message };
  },
}));

export default useProductStore;
