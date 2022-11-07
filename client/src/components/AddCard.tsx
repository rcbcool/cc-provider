import React from "react";
import CardList from "./CardList";
import Modal from "./Modal";
import axios from "axios";
import { checkCC } from "./Validation";

interface UserCard {
  name: string;
  card_no: number;
  amount: number;
  limit: number;
  id: number;
}

function AddCard() {
  console.log("Came here for props:: ");

  const [name, setName] = React.useState("");
  const [cardNo, setCardNo] = React.useState("");
  const [limit, setLimit] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const [show, setShow] = React.useState(false);
  const [modalData, setModalData] = React.useState({
    name: "",
    card_no: 0,
    amount: 0,
    limit: 0,
    id: 0,
  });

  const baseURL = "http://localhost:3002";

  let handleSubmit = async (e: any): Promise<any> => {
    e.preventDefault();
    try {
      if (checkCC(cardNo)) {
        let res = await fetch(baseURL + "/api/user/card/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            card_no: cardNo,
            limit: limit,
          }),
        });
        let resJson = await res.json();
        console.log(resJson);
        if (resJson.status === "success") {
          setName("");
          setCardNo("");
          setLimit("");
          setMessage(resJson.message);
          setCounter((counter) => counter + 1);
        } else if (resJson.status === "error") {
          setMessage(resJson.message);
        }
      } else {
        setMessage("Sorry! invalid card. Try with another card.");
        console.log("invalid Card");
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    // axios.get(baseURL).then((res) => setData(res.data));
    const getUserCard = async () => {
      let response: any = await axios.get(baseURL + "/api/user/card/list");
      if (response.status === 200) {
        setData(response.data);
      }
    };

    getUserCard();
  }, [counter]);

  let handleOperations = (e: any, args: UserCard, operation: string): any => {
    e.preventDefault();
    setShow(true);
    setModalData(args);
    console.log(operation);
    console.log(args);
  };

  let handleDialogClose = (e: any): void => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <>
      <div>
        <h1>Credit Card System</h1>
        <h3>Add</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label>Name</label>
            <br />
            <input
              type="text"
              name="card-name"
              placeholder="Enter the name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label>Card number</label>
            <br />
            <input
              type="text"
              name="card-number"
              placeholder="Enter card number"
              value={cardNo}
              onChange={(e) => setCardNo(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label>Limit</label>
            <br />
            <input
              type="text"
              name="card-limit"
              placeholder="Set the Card limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
          <div className="form-button">
            <button type="submit">Add</button>
          </div>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      <CardList data={data} handleOperations={handleOperations} />
      <Modal
        show={show}
        modalData={modalData}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
}

export default AddCard;
