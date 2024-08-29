import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
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
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleEditOpen = (product: Product) => {
    setEditProduct(product);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setEditProduct(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editProduct) {
      setEditProduct({
        ...editProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateProduct = () => {
    if (editProduct) {
      onUpdateProduct(editProduct);
      handleEditClose();
    }
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDeleteProduct(id);
    }
  };

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
            <TableCell>Actions</TableCell>
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
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditOpen(product)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editProduct?.name || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editProduct?.description || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={editProduct?.price || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={editProduct?.amount || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="corpName"
            label="Corp Name"
            type="text"
            fullWidth
            value={editProduct?.corpName || ""}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateProduct} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductTable;
