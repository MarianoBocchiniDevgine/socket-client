export interface Product extends NewProduct {
  id: number;
} 

export interface NewProduct {
  name: string;
  providerId: number;
  price: number;
  amount: number;
  corpId: number;
  corpName: string;
}

export interface AddProductProps {
  onAddProduct: (product: NewProduct) => void;
}


export interface ProductTableProps {
  products: Product[];
  onAddProduct: (product: NewProduct) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}