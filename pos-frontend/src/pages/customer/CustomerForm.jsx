import Layout from "../../components/layout/Layout";
import DynamicForm from "../../components/common/DynamicForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

const CustomerForm = () => {
  const { id } = useParams();

  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      let customerData = {};

      if (id) {
        const res = await api.get(`/api/customer/get?identifier=${id}`);
        customerData = res.data;

        // ✅ Ensure nested objects exist (important)
        customerData.billingAddress =
          customerData.billingAddress || {};
        customerData.shippingAddress =
          customerData.shippingAddress || {};
      }

      setInitialData(customerData);

    } catch (err) {
      console.error("❌ Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <DynamicForm
          title={id ? "Edit Customer" : "Add Customer"}
          saveApi="/api/customer/add"
          updateApi="/api/customer/update"
          redirectUrl="/customer/list"
          idField="identifier"
          initialData={initialData}
          fields={[
            // ✅ Customer Details
            {
              name: "customerName",
              label: "Customer Name",
              type: "text",
              disabled: !!id,
            },
            {
              name: "phoneNo",
              label: "Phone Number",
              type: "text",
              disabled: !!id,
            },

            // ✅ Financial
            {
              name: "partyType",
              label: "Party Type",
              type: "select",
              options: [
                { label: "Select", value: "" },
                { label: "Customer", value: "Customer" },
                { label: "Dealer", value: "Dealer" },
                { label: "Wholesaler", value: "Wholesaler" },
              ],
            },
            { name: "creditType", label: "Credit Type" },
            { name: "credit", label: "Credit" },
            { name: "creditLimit", label: "Credit Limit" },

            // ✅ Billing Address
            {
              name: "billingAddress.addressLine",
              label: "Billing Address Line",
            },
            {
              name: "billingAddress.city",
              label: "Billing City",
            },
            {
              name: "billingAddress.state",
              label: "Billing State",
            },
            {
              name: "billingAddress.zipCode",
              label: "Billing Zip Code",
            },
            {
              name: "billingAddress.country",
              label: "Billing Country",
            },

            // ✅ Shipping Address
            {
              name: "shippingAddress.addressLine",
              label: "Shipping Address Line",
            },
            {
              name: "shippingAddress.city",
              label: "Shipping City",
            },
            {
              name: "shippingAddress.state",
              label: "Shipping State",
            },
            {
              name: "shippingAddress.zipCode",
              label: "Shipping Zip Code",
            },
            {
              name: "shippingAddress.country",
              label: "Shipping Country",
            },
          ]}
        />
      )}
    </Layout>
  );
};

export default CustomerForm;
