import OutletHeader from "../layout/OutletHeader";
import Modal from "../layout/Modal";
import { useState } from "react";
import ProductForm from "../Forms/ProductForm";
import ViewModal from "../layout/ViewModal";
import exportToCsv from "../export/exportToCsv";
import exportToPdf from "../export/exportToPdf";
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
  const headers = ["Product ID", "Product Name", "Category", "Price", "Stock"];
  const data = products.map((p) => [
    p.product_id,
    p.product_name,
    p.category,
    p.price,
    p.stock,
  ]);
  const [viewModalData, setViewModalData] = useState<Products | null>(null);

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
  const handleView = (index: number) => {
    setViewModalData(products[index]);
    const viewModalElement = document.getElementById(
      "viewModal"
    ) as HTMLElement;
    const viewModalInstance = new (window as any).bootstrap.Modal(
      viewModalElement
    );
    viewModalInstance.show();
  };
  const handleExportPdf = () => {
    exportToPdf("Order Report", headers, data, "products.pdf");
  };

  // Export to CSV handler
  const handleExportCsv = () => {
    exportToCsv(headers, data, "products.csv");
  };
  return (
    <>
      <OutletHeader
        header={"Products"}
        showButton={true}
        onAddClick={handleAddClick}
        onExportPdf={handleExportPdf}
        onExportCsv={handleExportCsv}
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
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleView(index)}
                  >
                    View
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
      <ViewModal
        data={viewModalData}
        modalId="viewModal"
        title="View Product Details"
      />
    </>
  );
};

export default Products;
