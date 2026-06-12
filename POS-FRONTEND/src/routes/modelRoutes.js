import Products from "../pages/product/Products";
import AddProduct from "../pages/product/AddProduct";
import EditProduct from "../pages/product/EditProduct";

import Nodes from "../pages/node/Nodes";
import AddNode from "../pages/node/AddNode";
import EditNode from "../pages/node/EditNode";

import Roles from "../pages/role/Roles";
import AddRole from "../pages/role/AddRole";
import EditRole from "../pages/role/EditRole";

const modelRoutes = [

  {
    basePath: "/products",
    list: Products,
    add: AddProduct,
    edit: EditProduct,
  },

  {
    basePath: "/nodes",
    list: Nodes,
    add: AddNode,
    edit: EditNode,
  },

  {
    basePath: "/roles",
    list: Roles,
    add: AddRole,
    edit: EditRole,
  },

];

export default modelRoutes;