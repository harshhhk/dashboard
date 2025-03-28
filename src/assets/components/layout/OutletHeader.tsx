import { useEffect } from "react";
import feather from "feather-icons";

const OutletHeader = (props: any) => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{props.header}</h1>
        {props.showButton && (
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={props.onAddClick}
              >
                Add
              </button>

              {/* <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Export
              </button> */}
            </div>
            {/* <button
              type="button"
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
            >
              <span data-feather="calendar"></span>
              This week
            </button> */}
          </div>
        )}
      </div>
    </>
  );
};

export default OutletHeader;
