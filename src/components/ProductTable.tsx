import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddProduct from "./AddProduct";

interface Product {
  id: number;
  corpId: number;
  name: string;
  corpName: string;
  description: string;
  price: number;
  amount: number;
}

interface ProductTableProps {
  products: Product[];
  onAddProduct: (product: {
    name: string;
    description: string;
    price: number;
    amount: number;
    corpName: string;
  }) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onAddProduct,
}) => {
  return (
    <div>
      <AddProduct onAddProduct={onAddProduct} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Corp Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.amount}</TableCell>
              <TableCell>{product.corpName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
