import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommonEdit from "../../components/CommonEdit";
import {getItem, listItems, updateItem } from "../../services/api";
import SingleDropDown from "../../components/SingleDropDown";
import MultiCheckBox from "../../components/MultiCheckBox";

function EditProduct() {

  const { identifier: productId } =
    useParams();

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

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct = async () => {

    try {

      setLoading(true);

      const response = await getItem(
        "product",
        productId
      );

      setIdentifier(
        response.identifier || ""
      );

      setDescription(
        response.description || ""
      );

      setBrand(
        response.brand || ""
      );

      setModel(
        response.model || ""
      );

      setUnit(
        response.unit || ""
      );

      setCategory(
        response.category || []
      );

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load product"
      );

    } finally {

      setLoading(false);

    }

  };

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

    await updateItem("product", {

      identifier,

      description,

      brand,

      model,

      unit,

      category

    });

    setSuccessMessage(
      "Product updated successfully"
    );

    setTimeout(() => {

      navigate("/products");

    }, 1000);

  } catch (err) {

    console.error(err);

    setError(
      "Failed to update product"
    );

  } finally {

    setLoading(false);

  }

};

  return (

    <CommonEdit

      title="Edit Product"

      subtitle="Update product information"

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

      <SingleDropDown

        label="Brand"

        model="brand"

        value={brand}

        onChange={setBrand}

        placeholder="Select Brand"

        required = {true}

      />

      <SingleDropDown

        label="Model"

        model="model"

        value={model}

        onChange={setModel}

        placeholder="Select Model"

        required = {true}

      />

      <SingleDropDown

        label="Unit"

        model="unit"

        value={unit}

        onChange={setUnit}

        placeholder="Select Unit"

        required = {true}

      />

      <MultiCheckBox

        label="Category"

        model="category"

        values={category}

        onChange={setCategory}

        required = {true}

      />

    </CommonEdit>

  );

}

export default EditProduct;