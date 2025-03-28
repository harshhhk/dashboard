interface AccountFormProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    parentKey?: string,
    index?: number
  ) => void;
  handleAddContact: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  formData,
  handleChange,
  handleAddContact,
}) => {
  return (
    <form>
      {/* Basic Account Fields */}
      {[
        { id: "id", label: "ID" },
        { id: "code", label: "Code" },
        { id: "name", label: "Name" },
      ].map((field) => (
        <div className="mb-3" key={field.id}>
          <label htmlFor={field.id} className="col-form-label">
            {field.label}:
          </label>
          <input
            type="text"
            className="form-control"
            id={field.id}
            value={formData[field.id]}
            onChange={handleChange}
          />
        </div>
      ))}

      {/* Address Section */}
      <h5>Address</h5>

      {/* Dropdown for Address Type */}
      <div className="mb-3">
        <label htmlFor="type" className="col-form-label">
          Type:
        </label>
        <select
          className="form-control"
          id="type"
          value={formData.address.type}
          onChange={(e) => handleChange(e, "address")}
        >
          <option value="">Select Type</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
        </select>
      </div>

      {/* Other Address Fields */}
      {[
        { id: "address", label: "Address" },
        { id: "city", label: "City" },
        { id: "state", label: "State" },
        { id: "country", label: "Country" },
      ].map((field) => (
        <div className="mb-3" key={field.id}>
          <label htmlFor={field.id} className="col-form-label">
            {field.label}:
          </label>
          <input
            type="text"
            className="form-control"
            id={field.id}
            value={formData.address[field.id]}
            onChange={(e) => handleChange(e, "address")}
          />
        </div>
      ))}

      {/* Contacts Section */}
      <h5>
        Contact Details{" "}
        <button
          type="button"
          className="btn btn-success ms-2"
          onClick={() => handleAddContact()}
        >
          +
        </button>
      </h5>
      {formData.contacts.map((contact: any, index: number) => (
        <div key={index}>
          {/* Dropdown for Contact Type */}
          <div className="mb-3">
            <label htmlFor="contactType" className="col-form-label">
              Contact Type:
            </label>
            <select
              className="form-control"
              id="contactType"
              value={contact.contactType}
              onChange={(e) => handleChange(e, "contacts", index)}
            >
              <option value="">Select Contact Type</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
          </div>

          {/* Other Contact Fields */}
          {[
            { id: "contactPerson", label: "Contact Person" },
            { id: "contactDetail", label: "Contact Detail" },
          ].map((field) => (
            <div className="mb-3" key={field.id}>
              <label htmlFor={field.id} className="col-form-label">
                {field.label}:
              </label>
              <input
                type="text"
                className="form-control"
                id={field.id}
                value={contact[field.id]}
                onChange={(e) => handleChange(e, "contacts", index)}
              />
            </div>
          ))}
        </div>
      ))}
    </form>
  );
};

export default AccountForm;
