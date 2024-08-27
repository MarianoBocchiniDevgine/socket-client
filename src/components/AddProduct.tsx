import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

interface AddProductProps {
  onAddProduct: (product: {
    name: string;
    description: string;
    price: number;
    amount: number;
    corpName: string;
    corpId: number;
  }) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onAddProduct }) => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    amount: 0,
    corpName: "",
    corpId: 1, // Fijar el valor de corpId directamente aquí
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      onAddProduct(newProduct); // Usa el estado newProduct directamente
      handleClose();
    } catch (error) {
      console.error("Error al enviar el producto al servidor:", error);
    }
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
            name="description"
            label="Description"
            type="text"
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
          <TextField
            margin="dense"
            name="corpName"
            label="Corp Name"
            type="text"
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
