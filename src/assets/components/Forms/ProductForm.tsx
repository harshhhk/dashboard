interface ProductFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductForm :React.FC<ProductFormProps> = ({ formData, handleChange })  => {
  return (
    
    <>
      <form>
        {/* Dynamically generate input fields */}
        {[
          { id: "product_id", label: "Product ID" },
          { id: "product_name", label: "Product Name" },
          { id: "category", label: "Category" },
          { id: "price", label: "Price" },
          { id: "stock", label: "Stock" },
        
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

export default ProductForm;
