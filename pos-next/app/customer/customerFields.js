export const customerFields = [
  // Customer Details
  { name: "customerName", label: "Customer Name", type: "text" },
  { name: "phoneNo", label: "Phone Number", type: "text" },
  
  // ADDED: Crucial field to collect the email for the database identifier column
  { name: "email", label: "Email Address", type: "text" },

  // Financial Details
  {
    name: "partyType",
    label: "Party Type",
    type: "dropdown",
    options: [
      { label: "Customer", value: "Customer" },
      { label: "Dealer", value: "Dealer" },
      { label: "Wholesaler", value: "Wholesaler" },
    ],
  },
  { name: "creditType", label: "Credit Type", type: "text" },
  { name: "credit", label: "Credit", type: "number" },
  { name: "creditLimit", label: "Credit Limit", type: "number" },

  // Billing Address
  { name: "billingAddress.addressLine", label: "Billing Address Line", type: "text" },
  { name: "billingAddress.city", label: "Billing City", type: "text" },
  { name: "billingAddress.state", label: "Billing State", type: "text" },
  { name: "billingAddress.zipCode", label: "Billing Zip Code", type: "text" },
  { name: "billingAddress.country", label: "Billing Country", type: "text" },

  // Shipping Address
  { name: "shippingAddress.addressLine", label: "Shipping Address Line", type: "text" },
  { name: "shippingAddress.city", label: "Shipping City", type: "text" },
  { name: "shippingAddress.state", label: "Shipping State", type: "text" },
  { name: "shippingAddress.zipCode", label: "Shipping Zip Code", type: "text" },
  { name: "shippingAddress.country", label: "Shipping Country", type: "text" },
];