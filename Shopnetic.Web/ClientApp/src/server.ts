import { Category, Product, CartItem } from "./types"

export const server = {
  categories: {
    getCategories: async () => {
      return await fetch(`/api/categories`)
        .then(resp => resp.json())
        .then(data => data as Category[])
        .catch(error => console.error(error))
    }
  },
  products: {
    getProducts: async () => {
      return await fetch(`/api/products`)
        .then(resp => resp.json())
        .then(data => data as Product[])
        .catch(error => console.error(error))
    }
  },
  cart: {
    initializeCart: async () => {
      return await fetch(`/api/cart/init`)
        .then(resp => resp.json())
        .then(data => data as number)
        .catch(error => console.error(error))
    },
    addItemToCart: async (cartId: number, cartItem: CartItem) => {
      return await fetch(`/api/cart/${cartId}/addItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: cartItem.id, quantity: cartItem.quantity })
      })
        .then(resp => resp.json())
        .then(data => data as boolean)
        .catch(error => console.error(error))
    },
    removeItemFromCart: async (cartId: number, cartItem: CartItem) => {
      return await fetch(`/api/cart/${cartId}/removeItem`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: cartItem.id, quantity: cartItem.quantity })
      })
    }
  },
  checkout: {
    finalizeOrder: async (cartId: number) => {
      return await fetch(`/api/checkout/finalize/${cartId}`)
        .then(resp => resp.json())
        .then(data => data as number)
        .catch(error => console.error(error))
    },
    checkOrderStatus: async (orderId: number) => {
      return await fetch(`/api/checkout/check/${orderId}`)
        .then(resp => resp.json())
        .then(data => data as string)
        .catch(error => console.error(error))
    }
  }
}