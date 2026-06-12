

import ProductList from "./pages/product/ProductList";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";

import UserList from "./pages/user/UserList";
import NodeList from "./pages/node/NodeList";
import RackList from "./pages/rack/RackList";
import RoleList from "./pages/role/RoleList";
import CategoryList from "./pages/category/CategoryList";
import CustomerList from "./pages/customer/CustomerList";
import ShelfList from "./pages/shelf/ShelfList";
import UnitList from "./pages/unit/UnitList";
import BrandList from "./pages/brand/BrandList";
import PriceList from "./pages/price/PriceList";
import ModelList from "./pages/model/ModelList";
import WarehouseList from "./pages/warehouse/warehouse";
import StockList from "./pages/stock/StockList";

export const privateRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/profile", element: <Profile /> },

  // Product
  { path: "/product", element: <ProductList /> },
  { path: "/product/add", element: <AddProduct /> },
  { path: "/product/edit/:identifier", element: <EditProduct /> },

  // Masters
  { path: "/user/list", element: <UserList /> },
  { path: "/node/list", element: <NodeList /> },
  { path: "/rack/list", element: <RackList /> },
  { path: "/role/list", element: <RoleList /> },
  { path: "/category/list", element: <CategoryList /> },
  { path: "/customer/list", element: <CustomerList /> },
  { path: "/shelf/list", element: <ShelfList /> },
  { path: "/unit/list", element: <UnitList /> },
  { path: "/brand/list", element: <BrandList /> },
  { path: "/price/list", element: <PriceList /> },
  { path: "/model/list", element: <ModelList /> },
  { path: "/warehouse/list", element: <WarehouseList /> },
  { path: "/stock/list", element: <StockList /> },
];