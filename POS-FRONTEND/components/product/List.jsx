import { useState } from "react";
import axios from "axios";

import ListPage from "../ListPage";
import EditModal from "./Edit";

const ProductList = () => {
    const keys = ["id", "identifier", "name", "brandName", "category", "unit", "description", "status"];

    const modelName="product";

    const token = localStorage.getItem("token");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleEdit = async (identifier) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/${modelName}/get?identifier=${identifier}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedItem(res.data);

      setIsModalOpen(true);

    } catch (err) {
      console.error(err);
    }
  };

    const handleUpdateSuccess = (updatedItem) => {
        console.log("Updated:", updatedItem);

        setIsModalOpen(false);
    };
    
    return (
        <div>
            <ListPage keys={keys} modelName={modelName} onEdit={handleEdit}/>
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
                onUpdateSuccess={handleUpdateSuccess}
            />
        </div>
    )
}

export default ProductList