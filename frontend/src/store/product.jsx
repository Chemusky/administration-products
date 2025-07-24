import { create } from "zustand";

// se establece el estado global para poder usarse en cualquier componente de la aplicación
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // función createProduct para crear un producto
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please, fill in all fields." };
    }
    // para no poner toda la url en el archivo vite.config se ha creado un alias
    const res = await fetch("/api/products/add-product", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] })); // el .data se pone igual que la respuesta que se da en el backend
    return { success: true, message: data.message }; // El .message viene del controlador del backend
  },

  // función fetchProducts para obtener el listado de los productos
  fetchProducts: async () => {
    const res = await fetch("/api/products/");
    const data = await res.json();
    set({ products: data.data });
  },

  // función deleteProduct para eliminar un producto
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/delete-product/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // actualiza la ui inmediatamente sin necesidad de refrescar la página
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  // función updateProduct para actualizar los campos del producto
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`api/products/update-product/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success)
      return {
        success: false,
        message: data.message,
      };

    // actualiza la ui inmediatamente sin necesidad de refrescar la página
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return { success: true, message: data.message };
  },
}));
