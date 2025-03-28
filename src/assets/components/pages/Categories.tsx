import OutletHeader from "../layout/OutletHeader";
import { useState } from "react";
import Modal from "../layout/Modal";
import CategoryForm from "./CategoryForm";
interface Categories {
  category_id: string;
  category_name: string;
  category_description: string;
  status: string;
}
const Categories = () => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [categories, setCategories] = useState<Categories[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    category_id: "",
    category_name: "",
    category_description: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // ✅ Handle opening modal for editing

  const handleEdit = (index: number) => {
    setFormData(categories[index]);
    setEditIndex(index);

    setModalTitle("Update Category");
    // Show modal
    const modalElement = document.getElementById("exampleModal") as any;
    const modalInstance = new window.bootstrap.Modal(modalElement);
    modalInstance.show();
  };

  //  Add or Update order logic
  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedCategory = [...categories];
      updatedCategory[editIndex] = formData;
      setCategories(updatedCategory);
      setEditIndex(null);
    } else {
      // Add new order
      setCategories([...categories, formData]);
    }
  };

  const handleDelete = (index: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (isConfirmed) {
      const updatedCategory = categories.filter((_, i) => i !== index);
      setCategories(updatedCategory);
    }
  };

  const initialFormData = {
    category_id: "",
    category_name: "",
    category_description: "",
    status: "",
  };
  const handleAddClick = () => {
    setFormData(initialFormData); // Reset form
    setModalTitle("Add Category");
    setEditIndex(null);
  };

  return (
    <>
      <OutletHeader
        header={"Categories"}
        showButton={true}
        onAddClick={handleAddClick}
      ></OutletHeader>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Category ID</th>
              <th scope="col">Cateogry Name</th>
              <th scope="col">Category Description </th>
              <th scope="col">Status </th>

              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((catgory, index) => (
              <tr key={index}>
                <td>{catgory.category_id}</td>
                <td>{catgory.category_name}</td>
                <td>{catgory.category_description}</td>
                <td>{catgory.status}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        handleSubmit={handleSubmit}
        formType="categories"
        modalTitle={modalTitle}
        buttonText={editIndex !== null ? "Update Category" : "Add Category"}
        component={
          <CategoryForm formData={formData} handleChange={handleChange} />
        }
      ></Modal>
    </>
  );
};

export default Categories;
