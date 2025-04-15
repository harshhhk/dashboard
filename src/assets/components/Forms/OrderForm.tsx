interface OrderFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const OrderForm: React.FC<OrderFormProps> = ({ formData, handleChange }) => {
  return (
    <>
      <form>
        {/* Dynamically generate input fields */}
        {[
          { id: "order_id", label: "Order ID" },
          { id: "customer_name", label: "Customer Name" },
          { id: "product", label: "Product" },
          { id: "amount", label: "Amount" },
          { id: "status", label: "Status" },
          { id: "order_date", label: "Order Date" },
        ].map((field) => (
          <div className="mb-3" key={field.id}>
            <label htmlFor={field.id} className="col-form-label">
              {field.label}:
            </label>
            <input
              type="text"
              className="form-control"
              id={field.id}
              value={(formData as any)[field.id]}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </>
  );
};

export default OrderForm;
