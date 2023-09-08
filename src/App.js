import { useReducer } from "react";

const initialState = {
  openedAmount: 0,
  name: "",
  balance: 0,
  loan: 0,
  status: "",
  isActive: false,
  depositAmount: 0,
  withdrawAmount: 0,
  loanAmount: 0,
  payAmount: 0,
  msg: "",
  randomNum: null,
};

function reducer(state, action) {
  //if (!state.isActive && action.type !== "openAccount") return state;

  switch (action.type) {
    case "openedAmount":
      return {
        ...state,
        openedAmount: action.payload,
        msg: "",
      };

    case "name":
      return {
        ...state,
        name: action.payload,
        msg: "",
      };

    case "openAccount":
      if (state.name === "" || state.openedAmount < 5000) {
        return {
          ...state,
          msg: "You must provide your name and Amount not less than N5,000",
        };
      }

      return {
        ...state,
        randomNum: Math.floor(Math.random() * (10000000000 - 0 + 1)) + 0,

        balance: state.openedAmount,
        loan: 0,
        status: "openAccount",
        isActive: true,
      };

    case "depositAmount":
      return {
        ...state,
        depositAmount: action.payload,
        msg: "",
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + state.depositAmount,
        msg: "",
      };

    case "withdrawAmount":
      return {
        ...state,
        withdrawAmount: action.payload,
        msg: "",
      };

    case "withdraw":
      if (state.balance < action.payload) {
        return { ...state, msg: "Insufficient Balance" };
      }

      return {
        ...state,
        balance: state.balance - action.payload,
        msg: "",
      };

    case "loanAmount":
      return {
        ...state,
        loanAmount: action.payload,
        msg: "",
      };

    case "requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
        msg: "",
      };

    case "payAmount":
      return {
        ...state,
        payAmount: action.payload,
        msg: "",
      };

    case "payLoan":
      if (state.loan === 0 || state.payAmount > state.loan) {
        return {
          ...state,
          msg: "Loan is 0 or Amount > Loan",
        };
      }

      return {
        ...state,
        balance: state.balance - action.payload,
        loan: state.loan - action.payload,
        msg: "",
      };

    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) {
        return { ...state, msg: "Loan and Balance must be 0" };
      }
      return initialState;

    default:
      throw new Error("No Action to perform");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    name,
    openedAmount,
    depositAmount,
    withdrawAmount,
    loanAmount,
    payAmount,
    balance,
    isActive,
    loan,
    status,
    msg,
    randomNum,
  } = state;

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB");

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>

      {status !== "openAccount" && (
        <>
          <form>
            <p>
              <label>Name: </label>
              <input
                type="text"
                onChange={(e) =>
                  dispatch({ type: "name", payload: e.target.value })
                }
                style={{ textTransform: "uppercase" }}
                placeholder="Full name"
              />
            </p>

            <p>
              <label>Amount (NGN): </label>
              <input
                type="number"
                onChange={(e) =>
                  dispatch({
                    type: "openedAmount",
                    payload: Number(e.target.value),
                  })
                }
              />
            </p>
          </form>
        </>
      )}

      {status === "openAccount" && (
        <>
          <p>
            Welcome{" "}
            <span
              style={{
                color: "red",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {name}
            </span>
            , today's date is:{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>
              {formattedDate}
            </span>
          </p>
          <p>
            Account Number:{" "}
            <span style={{ fontWeight: "bold" }}>{randomNum}</span>
          </p>
          <p>Balance: {balance}</p>
          <p>Loan: {loan}</p>
        </>
      )}

      <span style={{ color: "red" }}>{msg}</span>
      <p>
        <button
          onClick={() =>
            dispatch({ type: "openAccount", payload: openedAmount })
          }
          disabled={isActive}
        >
          Open Account
        </button>
      </p>

      <p>
        <>
          <input
            type="number"
            onChange={(e) =>
              dispatch({
                type: "depositAmount",
                payload: Number(e.target.value),
              })
            }
            placeholder="Deposit Amount"
            disabled={!isActive}
          />

          <button
            onClick={() =>
              dispatch({ type: "deposit", payload: depositAmount })
            }
            disabled={!isActive}
          >
            Deposit
          </button>
        </>
      </p>

      <p>
        <>
          <input
            type="number"
            onChange={(e) =>
              dispatch({
                type: "withdrawAmount",
                payload: Number(e.target.value),
              })
            }
            placeholder="Withdrawal Amount"
            disabled={!isActive}
          />
          <button
            onClick={() =>
              dispatch({ type: "withdraw", payload: withdrawAmount })
            }
            disabled={!isActive}
          >
            Withdraw
          </button>
        </>
      </p>

      <p>
        <>
          <input
            type="number"
            onChange={(e) =>
              dispatch({
                type: "loanAmount",
                payload: Number(e.target.value),
              })
            }
            placeholder="Loan Amount"
            disabled={!isActive}
          />
          <button
            onClick={() =>
              dispatch({ type: "requestLoan", payload: loanAmount })
            }
            disabled={!isActive}
          >
            Request a loan
          </button>
        </>
      </p>

      <p>
        <>
          <input
            type="number"
            onChange={(e) =>
              dispatch({
                type: "payAmount",
                payload: Number(e.target.value),
              })
            }
            placeholder="Pay Amount"
            disabled={!isActive}
          />
          <button
            onClick={() => dispatch({ type: "payLoan", payload: payAmount })}
            disabled={!isActive}
          >
            Pay loan
          </button>
        </>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
