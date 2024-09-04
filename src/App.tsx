import React, { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import { io } from "socket.io-client";

const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketIo = io("http://localhost:4000");
    setSocket(socketIo);

    socketIo.on("products", (data: any[]) => {
      console.log("Productos recibidos desde el servidor: ", data);
      setProducts(data);
    });

    socketIo.on("productAdded", (newProduct: any) => {
      console.log("Nuevo producto recibido:", newProduct);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    });

    socketIo.on("productUpdated", (updatedProduct: any) => {
      console.log("Producto actualizado:", updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    });

    socketIo.on("productDeleted", (deletedProductId: number) => {
      console.log("Producto eliminado con ID:", deletedProductId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== deletedProductId)
      );
    });

    socketIo.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const handleAddProduct = async (product: {
    name: string;
    price: number;
    amount: number;
  }) => {
    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        socket.emit(products);
        console.log("producto cargado correctamente");
      } else {
        console.log("Error al agregar un producto");
      }
    } catch (error) {
      console.log("Error al agregar un producto", error);
    }
  };

  const handleUpdateProduct = (updatedProduct: any) => {
    if (socket) {
      socket.emit("updateProduct", updatedProduct);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    if (socket) {
      socket.emit("deleteProduct", productId);
    }
  };

  return (
    <div className="App">
      <ProductTable
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default App;
