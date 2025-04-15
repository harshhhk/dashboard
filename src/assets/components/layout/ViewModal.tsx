interface ViewModalProps<T> {
  data: T | null;
  modalId: string;
  title: string;
}

function ViewModal<T extends object>({
  data,
  modalId,
  title,
}: ViewModalProps<T>) {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}Label`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {data ? (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    {Object.entries(data).map(([key, value]) => (
                      <>
                        <tr key={key} className="table-dark">
                          <th style={{ textTransform: "capitalize" }}>
                            {key.replace(/_/g, " ")}
                          </th>
                        </tr>
                        <tr>
                          <td>{String(value)}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No data to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
