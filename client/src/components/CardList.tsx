import React from "react";
import "./CardList.css";

interface UserCard {
  name: string;
  card_no: number;
  amount: number;
  limit: number;
  id: number;
}

interface childItem {
  data: UserCard[];
  handleOperations: (e: any, args: UserCard, operations: string) => void;
}

function CardList(props: childItem) {
  return (
    <div className="wrapper">
      <h3>Existing Cards</h3>
      <p>{props.data.length === 0 ? "Loading..." : ""}</p>
      <div>
        <div className="table">
          <div className="table_row_head">
            <div className="cell">Name</div>
            <div className="cell">Card Number</div>
            <div className="cell">Balance</div>
            <div className="cell">Limit</div>
            <div className="cell">Operations</div>
          </div>
          {props.data.map((user: any, key: number) => {
            return (
              <div className="table_row" key={key}>
                <div className="cell">{user.name}</div>
                <div className="cell">{user.card_no}</div>
                <div className="cell">£{user.amount}</div>
                <div className="cell">£{user.limit}</div>
                <div className="cell">
                  <a
                    href="/"
                    title="Debit"
                    onClick={(e) => props.handleOperations(e, user, "d")}
                  >
                    Debit
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="/"
                    title="Credit"
                    onClick={(e) => props.handleOperations(e, user, "c")}
                  >
                    Credit
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CardList;
