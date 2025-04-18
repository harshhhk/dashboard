import Modal from "../layout/Modal";
import OutletHeader from "../layout/OutletHeader";
import { useState } from "react";
import OrderForm from "../Forms/OrderForm";
import ViewModal from "../layout/ViewModal";
import exportToPdf from "../export/exportToPdf";
import exportToCsv from "../export/exportToCsv";
import { useSelector } from "react-redux";
import { RootState } from "../typescript/store";
// import { useOutletContext } from "react-router-dom";

interface Orders {
  order_id: string;
  customer_name: string;
  product: string;
  amount: string;
  status: string;
  order_date: string;
}
const Orders: React.FC = () => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [orders, setOrders] = useState<Orders[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [viewModalData, setViewModalData] = useState<Orders | null>(null);
  const headers = [
    "Order ID",
    "Customer",
    "Product",
    "Amount",
    "Status",
    "Date",
  ];

  const data = orders.map((o) => [
    o.order_id,
    o.customer_name,
    o.product,
    o.amount,
    o.status,
    o.order_date,
  ]);
  const [formData, setFormData] = useState({
    order_id: "",
    customer_name: "",
    product: "",
    amount: "",
    status: "",
    order_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // ✅ Handle opening modal for editing

  const handleEdit = (index: number) => {
    setFormData(orders[index]);
    setEditIndex(index);

    setModalTitle("Update Order");
    // Show modal
    const modalElement = document.getElementById("exampleModal") as any;
    const modalInstance = new window.bootstrap.Modal(modalElement);
    modalInstance.show();
  };

  //using useOutletContext
  // const { searchTerm } = useOutletContext<{ searchTerm: string }>();

  // const filteredOrders = orders.filter((order) =>
  //   Object.values(order).some((val) =>
  //     val.toLowerCase().includes(search.toLowerCase())
  //   )
  // );

  //  Add or Update order logic
  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedOrders = [...orders];
      updatedOrders[editIndex] = formData;
      setOrders(updatedOrders);
      setEditIndex(null);
    } else {
      // Add new order
      setOrders([...orders, formData]);
    }
  };

  const handleView = (index: number) => {
    setViewModalData(orders[index]);
    const viewModalElement = document.getElementById(
      "viewModal"
    ) as HTMLElement;
    const viewModalInstance = new (window as any).bootstrap.Modal(
      viewModalElement
    );
    viewModalInstance.show();
  };

  const handleDelete = (index: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (isConfirmed) {
      const updatedOrders = orders.filter((_, i) => i !== index);
      setOrders(updatedOrders);
    }
  };

  const initialFormData = {
    order_id: "",
    customer_name: "",
    product: "",
    amount: "",
    status: "",
    order_date: "",
  };
  const handleAddClick = () => {
    setFormData(initialFormData); // Reset form
    setModalTitle("Add Order");
    setEditIndex(null);
  };
  const handleExportPdf = () => {
    exportToPdf("Order Report", headers, data, "orders.pdf");
  };

  // Export to CSV handler
  const handleExportCsv = () => {
    exportToCsv(headers, data, "orders.csv");
  };
  const searchTerm = useSelector((state: RootState) =>
    state.search.searchTerm.toLowerCase()
  );

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((val) => val.toLowerCase().includes(searchTerm))
  );
  return (
    <>
      <OutletHeader
        header={"Order"}
        showButton={true}
        onAddClick={handleAddClick}
        onExportPdf={handleExportPdf}
        onExportCsv={handleExportCsv}
      ></OutletHeader>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Product </th>
              <th scope="col">Amount </th>
              <th scope="col">Status</th>
              <th scope="col">Order Date</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.order_id}</td>
                <td>{order.customer_name}</td>
                <td>{order.product}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
                <td>{order.order_date}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleView(index)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </table>
      </div>
      <Modal
        handleSubmit={handleSubmit}
        formType="order"
        modalTitle={modalTitle}
        buttonText={editIndex !== null ? "Update Order" : "Add Order"}
        component={
          <OrderForm formData={formData} handleChange={handleChange} />
        }
      ></Modal>
      {/* View Modal */}
      <ViewModal
        data={viewModalData}
        modalId="viewModal"
        title="View Order Details"
      />
    </>
  );
};

export default Orders;
