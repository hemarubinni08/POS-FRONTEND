"use client";

import CommonAddPage from "@/app/components/CommonAddPage";
import { customerFields } from "../customerFields";
import api from "@/app/services/api";

export default function AddCustomerPage() {

  const initialValues = {
    customerName: "",
    phoneNo: "",
    email: "", // Initialized empty layout hook
    billingAddress: {},
    shippingAddress: {},
    status: true,
  };

  const transformPayload = (data) => {
    return {
      ...data,
      // Pass email directly to data tracking fields wrapper for safety
      identifier: data.email, 
      billingAddress: {
        ...data.billingAddress,
        addressType: "Billing",
        phoneNo: data.phoneNo,
      },
      shippingAddress: {
        ...data.shippingAddress,
        addressType: "Shipping",
        phoneNo: data.phoneNo,
      },
    };
  };

  const submitCustomer = async (data) => {
    try {
      const response = await api.post(
        "/api/customer/add",
        transformPayload(data)
      );

      console.log("✅ Saved Successfully to DB:", response.data);
      return response;
    } catch (error) {
      console.error(
        "❌ Save Execution Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return (
    <CommonAddPage
      title="Add Customer Profile"
      submitApi={submitCustomer}
      redirectRoute="/customer/list"
      fields={customerFields}
      initialValues={initialValues}
      submitButtonText="Save Customer"
    />
  );
}