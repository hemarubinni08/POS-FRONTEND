import React from "react";
import CommonList from "../../components/ListPage5Col"; // Ensure this points to your updated CommonList file

const CartList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Cart ID", field: "identifier" },
    { 
      label: "Original Price", 
      field: "originalPrice",
    },
    { 
      label: "Total Discount", 
      field: "totalDiscount",
    },
    { 
      label: "Total Price", 
      field: "totalPrice",
    },
    { 
      label: "Coupon Code", 
      field: "couponCode",
    },
    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Cart Management"
      columns={columns}
      urlName="cart"
      showStatus={true}
    />
  );
};

export default CartList;