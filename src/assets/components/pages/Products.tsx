import OutletHeader from "../layout/OutletHeader";
import Modal from "../layout/Modal";
import { useState } from "react";
import ProductForm from "./ProductForm";
interface Products {
  product_id: string;
  product_name: string;
  category: string;
  price: string;
  stock: string;
}
const Products = () => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [products, setProducts] = useState<Products[]>([]);
  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEdit = (index: number) => {
    setFormData(products[index]);
    setEditIndex(index);

    setModalTitle("Update Product");
    // Show modal
    const modalElement = document.getElementById("exampleModal") as any;
    const modalInstance = new window.bootstrap.Modal(modalElement);
    modalInstance.show();
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const upadatedProducts = [...products];
      upadatedProducts[editIndex] = formData;
      setProducts(upadatedProducts);
      setEditIndex(null);
    } else {
      // Add new order
      setProducts([...products, formData]);
    }
  };

  const handleDelete = (index: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      const upadatedProducts = products.filter((_, i) => i !== index);
      setProducts(upadatedProducts);
    }
  };

  const initialFormData = {
    product_id: "",
    product_name: "",
    category: "",
    price: "",
    stock: "",
  };
  const handleAddClick = () => {
    setFormData(initialFormData); // Reset form
    setModalTitle("Add Product  ");
    setEditIndex(null);
  };
  return (
    <>
      <OutletHeader
        header={"Products"}
        showButton={true}
        onAddClick={handleAddClick}
      ></OutletHeader>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
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
        formType="product"
        modalTitle={modalTitle}
        buttonText={editIndex !== null ? "Update Product" : "Add Product"}
        component={
          <ProductForm formData={formData} handleChange={handleChange} />
        }
      ></Modal>
    </>
  );
};

export default Products;
