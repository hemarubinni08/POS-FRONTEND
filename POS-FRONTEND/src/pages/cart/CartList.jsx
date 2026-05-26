import React from "react";
import List from "../../components/list";

function CartList() {
    const columns = [
        { key: 'identifier', label: 'Customer id' },
        { key: 'coupon', label: 'Coupon' },
        { key: 'totalDiscount', label: 'Total Discount' },
        { key: 'totalPrice', label: 'Total Price' },
        { key: 'originalPrice', label: 'Original Price' }
    ]

    return (
        <List
            title='Cart'
            apiPath='cart'
            columns={columns}
            addPath='/cart/add'
            editPath='/cart/edit'
        />
    );
}

export default CartList;