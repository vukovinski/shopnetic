const hostname = "localhost:5001";

export const server = {
    products: {
        getProduct: async (productId: number) : Promise<Product | void> => {
            return fetch(`https://${hostname}/products/${productId}`)
            .then(resp => resp.json())
            .then(data => data as Product)
            .catch(error => console.log(error))
        },
        editProduct : async (editProductRequest: Product) : Promise<Boolean | void> => {
            return fetch(`https://${hostname}/products/edit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editProductRequest)
            })
            .then(resp => resp.json())
            .then(data => data as Boolean)
            .catch(error => console.log(error))
        },
        saveProductImage : async (productId: number, imageFile: File) : Promise<number | void> => {
            const formData = new FormData();
            formData.append('imageFile', imageFile);
            return fetch(`https://${hostname}/products/${productId}/uploadimage`, {
                method: 'POST',
                body: formData
            })
            .then(resp => resp.json())
            .then(data => data as number)
            .catch(error => console.log(error))
        }
    }
}

interface Product
{
    id: number,
    name: string,
    description: string
    category: {
        categoryId: number,
        categoryName: string
    },
    currentPrice: {
        price: number
    },
    inventory: {
        quantity: number,
        lowStockThreshold: number
    }
    status: 'Active' | 'Inactive',
    sku: string,
    images: [{
        imageId: number,
        primary: Boolean,
        imageUrl: string
    }]
}