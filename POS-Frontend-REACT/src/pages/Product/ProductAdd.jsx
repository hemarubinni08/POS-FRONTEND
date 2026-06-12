import React, { useState } from "react";
import BaseAddForm from "../../components/add/BaseAddForm";
import SingleDropdown from "../../components/dropDowns/singleDropDown";
import MultiDropDown from "../../components/dropDowns/multiDropDown";

export default function ProductAdd() {
  // 1. Core localized states to hold the custom dropdown selections
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // 2. Map structural field properties directly into the BaseAddForm configuration array
  const productFields = [
    {
      key: "name",
      type: "text",
      label: "Name"
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

  // 3. Collect state data to merge smoothly into the final API payload
  const consolidatedDropdownData = {
    categories: selectedCategories,
    brand: selectedBrand,
    model: selectedModel,
  };

  return (
    <BaseAddForm
      title="Product"
      apiPath="product" // Dynamic path builds: api.post('/product/add')
      extraFields={productFields}
      extraData={consolidatedDropdownData}
    />
  );
}