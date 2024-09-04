import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AddProductProps, NewProduct } from "../types";

const AddProduct = ({ onAddProduct }: AddProductProps) => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    providerId: 0,
    price: 0,
    amount: 0,
    corpId: 1,
    corpName: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === "price" ||
        name === "amount" ||
        name === "corpId" ||
        name === "providerId"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Agregar Producto
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Nuevo Producto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="providerId"
            label="Provider ID"
            type="number"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
