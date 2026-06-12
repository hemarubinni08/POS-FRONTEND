import { useState } from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";
import SingleDropdown from "../../components/dropdowns/SingleDropdown";
import MultiDropDown from "../../components/dropdowns/MultiDropDown";
 
export default function AddProduct() {
 
  const [brand,    setBrand]    = useState("");
  const [unit,     setUnit]     = useState("");
  const [model,    setModel]    = useState("");
  const [category, setCategory] = useState([]);  
 
  const extraFields = [
    {
      key: "name",
      label: "Product Name",
      type: "text",
      required: true,
    },
    {
      key: "brand",
      type: "custom",
      component: (
        <SingleDropdown
          label="Brand"
          apiUrl="/brand/findByStatus"
          selectedValue={brand}
          onChange={(val) => setBrand(val)}
        />
      ),
    },
    {
      key: "unit",
      type: "custom",
      component: (
        <SingleDropdown
          label="Unit"
          apiUrl="/unit/findByStatus"
          selectedValue={unit}
          onChange={(val) => setUnit(val)}
        />
      ),
    },
    {
      key: "model",
      type: "custom",
      component: (
        <SingleDropdown
          label="Model"
          apiUrl="/models/findByStatus"
          selectedValue={model}
          onChange={(val) => setModel(val)}
        />
      ),
    },
    {
      key: "category",
      type: "custom",
      component: (
        <MultiDropDown
          label="Category"
          valueField="identifier"
          labelField="identifier"
          apiUrl="/category/getBySuperCategoryNotNull"
          onChange={(val) => setCategory(val)}
          selectedValues={category}
         
        />
      ),
    },
  ];
 
  return (
    <AddFormSkeleton
      title="Product"
      apiPath="product"
      extraFields={extraFields}
      extraData={{ brand, unit, model, category }}
    />
  );
}