import OutletHeader from "../layout/OutletHeader";
import { useState } from "react";
import Modal from "../layout/Modal";
import AccountForm from "../Forms/AccountForm";
import ViewModal from "../layout/ViewModal";
import exportToCsv from "../export/exportToCsv";
import exportToPdf from "../export/exportToPdf";

interface Address {
  type: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

interface Contact {
  contactType: string;
  contactPerson: string;
  contactDetail: string;
}

interface Account {
  id: string;
  code: string;
  name: string;
  address: Address;
  contacts: Contact[];
}

const Accounts = () => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [contactCount, setContactCount] = useState<number>(0);
  const [viewModalData, setViewModalData] = useState<Account | null>(null);
  const [formData, setFormData] = useState<Account>({
    id: "",
    code: "",
    name: "",
    address: {
      type: "",
      address: "",
      city: "",
      state: "",
      country: "",
    },
    contacts: [
      {
        contactType: "",
        contactPerson: "",
        contactDetail: "",
      },
    ],
  });
  const headers = [
    "Account ID",
    "Account Code",
    "Account Name",
    "Address Type",
    "Address",
    "City",
    "State",
    "Country",
    "Contact type",
    "Contact Person",
    "Contact Detail",
  ];
  const data = accounts.flatMap((a) =>
    a.contacts.map((c) => [
      a.id,
      a.code,
      a.name,
      a.address.type,
      a.address.address,
      a.address.city,
      a.address.state,
      a.address.country,
      c.contactType,
      c.contactPerson,
      c.contactDetail,
    ])
  );
  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    parentKey?: string,
    index?: number
  ) => {
    const { id, value } = e.target;

    if (parentKey === "address") {
      setFormData({
        ...formData,
        address: { ...formData.address, [id]: value },
      });
    } else if (parentKey === "contacts" && index !== undefined) {
      const updatedContacts = [...formData.contacts];
      updatedContacts[index] = { ...updatedContacts[index], [id]: value };
      setFormData({ ...formData, contacts: updatedContacts });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // ✅ Handle Edit
  const handleEdit = (index: number) => {
    setFormData(accounts[index]);
    setEditIndex(index);
    setModalTitle("Update Account");

    // Show modal
    const modalElement = document.getElementById("exampleModal") as any;
    const modalInstance = new window.bootstrap.Modal(modalElement);
    modalInstance.show();
  };

  // ✅ Add or Update Account logic
  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedAccounts = [...accounts];
      updatedAccounts[editIndex] = formData;
      setAccounts(updatedAccounts);
      setEditIndex(null);
    } else {
      setAccounts([...accounts, formData]);
      console.log(formData);
    }
  };

  // ✅ Handle Delete
  const handleDelete = (index: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (isConfirmed) {
      const updatedAccounts = accounts.filter((_, i) => i !== index);
      setAccounts(updatedAccounts);
    }
  };
  const handleAddContact = () => {
    setContactCount(contactCount + 1);

    // Add a new empty contact dynamically to the array
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        { contactType: "", contactPerson: "", contactDetail: "" },
      ],
    });
  };

  // ✅ Initial Form Data for Reset
  const initialFormData: Account = {
    id: "",
    code: "",
    name: "",
    address: {
      type: "",
      address: "",
      city: "",
      state: "",
      country: "",
    },
    contacts: [
      {
        contactType: "",
        contactPerson: "",
        contactDetail: "",
      },
    ],
  };

  const handleAddClick = () => {
    setFormData(initialFormData);
    setModalTitle("Add Account");
    setEditIndex(null);
  };

  const handleRemoveContact = (index: number) => {
    if (formData.contacts.length > 1) {
      const updatedContacts = formData.contacts.filter(
        (_: any, i: number) => i !== index
      );
      setFormData({
        ...formData,
        contacts: updatedContacts,
      });
    }
  };
  const handleView = (index: number) => {
    setViewModalData(accounts[index]);
    const viewModalElement = document.getElementById(
      "viewModal"
    ) as HTMLElement;
    const viewModalInstance = new (window as any).bootstrap.Modal(
      viewModalElement
    );
    viewModalInstance.show();
  };
  const handleExportPdf = () => {
    exportToPdf("Account Report", headers, data, "account.pdf");
  };

  // Export to CSV handler
  const handleExportCsv = () => {
    exportToCsv(headers, data, "account.csv");
  };
  return (
    <>
      <OutletHeader
        header={"Accounts"}
        showButton={true}
        onAddClick={handleAddClick}
        onExportPdf={handleExportPdf}
        onExportCsv={handleExportCsv}
      />
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Code</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <td>{account.id}</td>
                <td>{account.code}</td>
                <td>{account.name}</td>
                <td>{account.address.address}</td>
                <td>{account.address.city}</td>

                <td>{account.contacts[contactCount]?.contactPerson}</td>
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
        formType="account"
        modalTitle={modalTitle}
        buttonText={editIndex !== null ? "Update Account" : "Add Account"}
        component={
          <AccountForm
            formData={formData}
            handleChange={handleChange}
            handleAddContact={handleAddContact}
            handleRemoveContact={handleRemoveContact}
          />
        }
      />
      <ViewModal
        data={viewModalData}
        modalId="viewModal"
        title="View Order Details"
      />
    </>
  );
};

export default Accounts;
