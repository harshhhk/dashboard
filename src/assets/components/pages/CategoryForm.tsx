interface CategoryFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CategoryForm: React.FC<CategoryFormProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <form>
        {/* Dynamically generate input fields */}
        {[
          { id: "category_id", label: "Category ID" },
          { id: "category_name", label: "Category Name" },
          { id: "category_description", label: "Category Description" },
          { id: "status", label: "Status" },
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

export default CategoryForm;
