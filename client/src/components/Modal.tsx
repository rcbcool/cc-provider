import React from "react";

interface UserCard {
    name: string;
    card_no: number;
    amount: number;
    limit: number;
    id: number;
  }

interface childItem {
  show: Boolean;
  modalData: UserCard;
  handleDialogClose: (e: any) => void;
}

function Modal(props: childItem) {
  const [topClasses, setTopClasses] = React.useState("modal fade");

  React.useEffect(() => {
    if (props.show === true) {
      setTopClasses("modal fade show");
    } else if (props.show === false) {
      setTopClasses("modal");
    }
  }, [props.show]);

  return (
    <div
      className={topClasses}
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Credit / Debit Updates
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={(e) => props.handleDialogClose(e)}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="col-form-label">
                  Name: {props.modalData.name}
                </label>
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Card Number: {props.modalData.card_no}
                </label>
              </div>
              <div className="mb-3">
                <label className="col-form-label">
                  Balance: {props.modalData.amount}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="card-amount" className="col-form-label">
                  Amount:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="card-amount"
                  value={props.modalData.amount}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={(e) => props.handleDialogClose(e)}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
