import AddPage from "../AddPage";

import Brands from "../../pages/dropdown/Brands";
import Models from "../../pages/dropdown/Models";
import Categories from "../../pages/dropdown/Categories";
import Units from "../../pages/dropdown/Units";

const ProductAdd = () => {

    const fields = [
        {
            name: "identifier",
            type: "text",
            label: "Identifier",
        },
        {
            name: "name",
            type: "text",
            label: "Name",
        },
        {
            name: "description",
            type: "textarea",
            label: "Description",
        },
    ];

    const initialData = {
        identifier: "",
        name: "",
        description: "",
        brandName: "",
        model: "",
        category: [],
        unit: "",
    };

    const modelName = "product";

    return (
        <AddPage
            modelName={modelName}
            fields={fields}
            initialData={initialData}
        >
            <Brands />
            <Models />
            <Categories />
            <Units />
        </AddPage>
    );
};

export default ProductAdd;