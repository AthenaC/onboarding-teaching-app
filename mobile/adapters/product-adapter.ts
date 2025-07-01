import {
  fetchHandler,
  getPatchOptions,
  getPostOptions,
  deleteOptions,
} from "../utils/fetchingUtils";
import { Product } from "../types";

// Use computer's IP address for physical device with Expo Go
const baseUrl = "http://***REMOVED***:3001/api/products";

export const createProduct = async (productData: Partial<Product>) => {
  if (!productData) {
    console.error("createProduct: productData is undefined");
    return [null, "No product data provided"];
  }

  try {
    const result = await fetchHandler(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify(productData), 
    });
    return result;
  } catch (error) {
    console.error("Create product error:", error);
    return [null, error];
  }
};

export const getAllProducts = async () => {
  return await fetchHandler(baseUrl);
};

export const getProduct = async (id: number) => {
  return await fetchHandler(`${baseUrl}/${id}`);
};

export const updateProduct = async (productId: number, productData: Partial<Product>) => {
  if (!productData) {
    console.error("updateProduct: productData is undefined");
    return [null, "No product data provided"];
  }

  try {
    const result = await fetchHandler(`${baseUrl}/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    return result;
  } catch (error) {
    console.error("Update product error:", error);
    return [null, error];
  }
};

export const deleteProduct = async (id: number) => {
  return fetchHandler(`${baseUrl}/${id}`, deleteOptions);
}; 