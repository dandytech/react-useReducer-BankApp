import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  status: "",
  isActive: false,
};

function reducer(state, action) {
  //if (!state.isActive && action.type !== "openAccount") return state;

  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        loan: 0,
        status: "openAccount",
        isActive: true,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "withdraw":
      if (state.balance < action.payload) return state;

      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };

    case "payLoan":
      if (state.loan === 0) return state;
      return {
        ...state,
        balance: state.balance - action.payload,
        loan: state.loan - action.payload,
      };

    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) return state;

      return initialState;

    default:
      throw new Error("No Action to perform");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { balance, isActive, loan, status } = state;

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>

      {status === "openAccount" && (
        <>
          <p>Balance: {balance}</p>
          <p>Loan: {loan}</p>
        </>
      )}

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount", payload: 500 })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "payLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Pay loan
        </button>
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
