const hostname = "localhost:5001";

export const server = {
    products: {
        addProduct: async (addProductRequest: Product, productImages: ProductImage[]) : Promise<number | void> => {
            const productId = await fetch(`https://${hostname}/products/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addProductRequest)
            })
            .then(resp => resp.json())
            .then(data => data as number)
            .catch(error => console.error(error));

            if (productId) {
                productImages.forEach(async (productImage) => {
                    await server.products.saveProductImage(productId, productImage)
                });
            }
        },
        getProduct: async (productId: number) : Promise<Product | void> => {
            return fetch(`https://${hostname}/products/${productId}`)
            .then(resp => resp.json())
            .then(data => data as Product)
            .catch(error => console.error(error))
        },
        editProduct : async (editProductRequest: Product) : Promise<Boolean | void> => {
            return fetch(`https://${hostname}/products/edit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editProductRequest)
            })
            .then(resp => resp.json())
            .then(data => data as Boolean)
            .catch(error => console.error(error))
        },
        saveProductImage : async (productId: number, productImage: ProductImage) : Promise<number | void> => {
            const formData = new FormData();
            formData.append('imageFile', productImage.imageFile);
            return fetch(`https://${hostname}/products/${productId}/uploadimage?primary=${productImage.primary}`, {
                method: 'POST',
                body: formData
            })
            .then(resp => resp.json())
            .then(data => data as number)
            .catch(error => console.error(error))
        }
    },
    categories: {
        getCategories: async () : Promise<Category[] | void> => {
            return fetch(`https://${hostname}/categories`)
            .then(resp => resp.json())
            .then(data => data as Category[])
            .catch(error => console.error(error))
        }
    },
    shipments: {
        getShipments: async () : Promise<Shipment[] | void> => {
            return fetch(`https://${hostname}/shipments`)
            .then(resp => resp.json())
            .then(data => data as Shipment[])
            .catch(error => console.error(error))
        }
    },
    orders: {
        getOrders: async () : Promise<Order[] | void> => {
            return fetch(`https://${hostname}/orders`)
            .then(resp => resp.json())
            .then(data => data as Order[])
            .catch(error => console.error(error))
        },
        editOrder: async (editOrderRequest: Order) : Promise<Boolean | void> => {
            return fetch(`https://${hostname}/orders/edit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editOrderRequest)
            })
            .then(resp => resp.json())
            .then(data => data as Boolean)
            .catch(error => console.error(error))
        }
    },
    dashboard: {
        getDashboardData: async () : Promise<DashboardData | void> => {
            return fetch(`https://${hostname}/dashboard`)
            .then(resp => resp.json())
            .then(data => data as DashboardData)
            .catch(error => console.error(error))
        }
    }
}

interface DashboardData {
    totalOrders: number,
    totalRevenue: number,
    totalCustomers: number,
    totalProducts: number,
    recentOrders: Order[]
}

interface Order {
    orderId: number,
    customerName: string,
    orderDate: Date,
    totalAmount: number,
    status: 'Pending' | 'Processing' | 'Shipped' | 'Cancelled',
    items: OrderItem[]
}

interface OrderItem {
    orderItemId: number,
    productId: number,
    productName: string,
    quantity: number,
    price: number
}

interface Shipment {
    shipmentId: number,
    orderId: number,
    trackingNumber: string,
    shippedDate: Date,
    deliveryDate: Date,
    customer: string,
    destination: string,
    status: 'Preparing' | 'Shipped' | 'Delivered' | 'Cancelled'
}


interface Category {
    categoryId: number,
    categoryName: string
}

interface ProductImage {
    imageFile: File,
    primary: Boolean
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