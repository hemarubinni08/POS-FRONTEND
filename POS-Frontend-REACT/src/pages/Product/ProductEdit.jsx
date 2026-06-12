import React, { useState } from "react";
import BaseEditForm from "../../components/edit/BaseEditForm";
import SingleDropdown from "../../components/dropDowns/singleDropDown";
import MultiDropDown from "../../components/dropDowns/multiDropDown";

export default function ProductEdit() {
  // 1. Local states to manage data returned from the GET request
  const [selectedName, setSelectedName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // 2. Define layout schema. BaseEditForm maps over this.
  const productFields = [
    {
      key: "name",
      type: "text",
      label: "Name",
    },
    {
      key: "categories",
      type: "custom",
      component: (
        <MultiDropDown
          label="Categories"
          entity="category"
          selectedValues={selectedCategories}
          onChange={(values) => setSelectedCategories(values)}
          valueField="identifier"
          labelField="identifier"
        />
      ),
    },
    {
      key: "brand",
      type: "custom",
      component: (
        <SingleDropdown
          label="Brand"
          entity="brand"
          selectedValue={selectedBrand}
          onChange={(value) => setSelectedBrand(value)}
          valueField="identifier"
          labelField="identifier"
        />
      ),
    },
    {
      key: "model",
      type: "custom",
      component: (
        <SingleDropdown
          label="Model"
          entity="models"
          selectedValue={selectedModel}
          onChange={(value) => setSelectedModel(value)}
          valueField="identifier"
          labelField="identifier"
        />
      ),
    },
  ];

  // 3. Hand over state-updaters so BaseEditForm can automatically write database responses into them
  const functionalSetters = {
    categories: setSelectedCategories,
    brand: setSelectedBrand,
    model: setSelectedModel,
  };

  // 4. Mirror the values back down to append safely to the payload during submission
  const consolidatedDropdownData = {
    categories: selectedCategories,
    brand: selectedBrand,
    model: selectedModel,
  };

  return (
    <BaseEditForm
      title="Product"
      apiPath="product"
      extraFields={productFields}
      setters={functionalSetters}
      extraData={consolidatedDropdownData}
    />
  );
}