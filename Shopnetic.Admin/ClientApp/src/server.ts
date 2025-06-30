const hostname = "localhost:5001";

export const server = {
    products: {
        getProduct: async (productId: number) : Promise<Product | void> => {
            return fetch(`https://${hostname}/products/${productId}`)
            .then(resp => resp.json())
            .then(data => data as Product)
            .catch(error => console.log(error))
        },
        editProduct: async (editProductRequest: EditProductRequest) => {

        }
    }
}

interface Product
{
    id: number,
    name: string,
    description: string
    currentPrice: {
        productPriceId: number,
        price: number,
        effectiveFrom: string,
        effectiveTo: string
    },
    inventory: {
        productInventoryId: number,
        quantity: number,
        lastUpdated: string
    }
}

interface EditProductRequest
{

}