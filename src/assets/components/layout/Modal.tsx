interface ModalProps {
  handleSubmit: () => void;

  formType: "order" | "product" | "categories" | "account";
  component: any;
  modalTitle: string; // 👈 New prop for modal title
  buttonText: string; // 👈 New prop for button text
}
const Modal: React.FC<ModalProps> = ({
  handleSubmit,

  component,
  modalTitle,
  buttonText,
}) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">{component}</div>

            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Add
              </button>
            </div> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
