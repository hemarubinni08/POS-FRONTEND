import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonAdd from "../../components/CommonAdd";
import SingleDropDown from "../../components/SingleDropDown";
import MultiCheckBox from "../../components/MultiCheckBox";
import { addItem } from "../../services/api";

function AddProduct() {

  const navigate = useNavigate();

  const [identifier, setIdentifier] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [model, setModel] =
    useState("");

  const [unit, setUnit] =
    useState("");

  const [category, setCategory] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      setSuccessMessage("");

      if (category.length === 0) {

        setError(
            "Please select at least one category"
        );

        setLoading(false);

        return;

        }

      await addItem("product", {

        identifier,

        description,

        brand,

        model,

        unit,

        category

      });

      setSuccessMessage(
        "Product added successfully"
      );

      setTimeout(() => {

        navigate("/products");

      }, 1000);

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Failed to add product"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <CommonAdd

      title="Add Product"

      subtitle="Create a new product"

      identifier={identifier}

      setIdentifier={setIdentifier}

      description={description}

      setDescription={setDescription}

      loading={loading}

      error={error}

      successMessage={successMessage}

      onSubmit={handleSubmit}

      cancelPath="/products"

    >

      {/* BRAND */}

      <SingleDropDown

        label="Brand"

        model="brand"

        value={brand}

        onChange={setBrand}

        placeholder="Select Brand"

        required={true}

      />

      {/* MODEL */}

      <SingleDropDown

        label="Model"

        model="model"

        value={model}

        onChange={setModel}

        placeholder="Select Model"

        required={true}

      />

      {/* UNIT */}

      <SingleDropDown

        label="Unit"

        model="unit"

        value={unit}

        onChange={setUnit}

        placeholder="Select Unit"

        required={true}

      />

      {/* CATEGORY */}

      <MultiCheckBox

        label="Category"

        model="category"

        values={category}

        onChange={setCategory}

        required={true}

      />

    </CommonAdd>

  );

}

export default AddProduct;