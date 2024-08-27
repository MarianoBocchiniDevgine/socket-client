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
      console.log("Productos recibidos desde el servidor:", data);
      setProducts(data);
    });

    socketIo.on("productAdded", (newProduct: any) => {
      console.log("Nuevo producto recibido:", newProduct);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    });

    socketIo.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const handleAddProduct = (product: {
    name: string;
    description: string;
    price: number;
    amount: number;
    corpName: string;
  }) => {
    if (socket) {
      socket.emit("newProduct", product);
    }
  };

  return (
    <div className="App">
      <ProductTable products={products} onAddProduct={handleAddProduct} />
    </div>
  );
};

export default App;
