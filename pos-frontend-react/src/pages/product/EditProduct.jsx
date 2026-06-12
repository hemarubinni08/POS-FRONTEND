import { useState } from "react";
import EditFormSkeleton from "../../components/EditFormSkeleton";
import SingleDropdown from "../../components/dropdowns/SingleDropdown";
import MultiDropDown from "../../components/dropdowns/MultiDropDown";
 
export default function EditProduct() {
 
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
          apiUrl="/category/getBySuperCategoryNotNull"
          valueField="identifier"
          labelField="identifier"
          selectedValues={category}
          onChange={(val) => setCategory(val)}
        />
      ),
    },
  ];
 
  return (
    <EditFormSkeleton
      title="Product"
      apiPath="product"
      extraFields={extraFields}
      extraData={{ brand, unit, model, category }}
      setters={{ brand: setBrand, unit: setUnit, model: setModel, category: setCategory }}
    />
  );
}
 
 