import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Select from "react-select";
import axios from "axios";

function App() {
  const [operation, setOperation] = useState("+");
  const [operand1, setOperand1] = useState();
  const [operand2, setOperand2] = useState();

  const [error, setErorr] = useState("");
  const [isSuccess, setIsSucess] = useState(false);
  const [result, setResult] = useState(0);

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type":"application/json"
    },
  };

  const calculate = () => {
    if(operand1 == null || operand2 == null || operation == null || operand1 == "" || operand2 == ""){
      setErorr("All fields are required")
      return;
    }

    axios
      .post("http://localhost:8000/api/v1/math", {
        operand1: parseFloat(operand1),
        operand2: parseFloat(operand2),
        operation: operation,
      })
      .then((res) => {
        setIsSucess(true);
        setResult(res.data.data);
        setErorr("")
      })
      .catch((err) => {
        setIsSucess(false);
        setResult(0);
        setErorr(err.response.data.error)
      });
  };

  const options = [
    { value: "+", label: "Add(+)" },
    { value: "-", label: "Subtract(-)" },
    { value: "*", label: "Multiply(*)" },
    { value: "/", label: "Divide(/)" },
    { value: "**", label: "Power(**)" },
    { value: "log", label: "Log" },
    { value: "ln", label: "Natural Log(ln)" },
  ];

  const handleSelectChange = ({ value }) => {
    setOperation(value);
  };

  return (
    <div className="app-div">
      <h1 className="app-title" id="_calculate_page">
        Nkubito Pacis Calculator
      </h1>
      {error !== "" && (
        <div className="error-div" id="ErrorMessage">
          {error}
        </div>
      )}
      {isSuccess && (
        <div
          className="success-div"
          id="SuccessMessage"
        >
          Sucessfully Calculated : {result}
        </div>
      )}
      <div>
        <Select
          defaultValue={operation}
          onChange={(value) => handleSelectChange({ ...value })}
          options={options}
          placeholder={"Choose operation"}
          className="select"
        />
        <Input
          type="number"
          placeholder="Operand one"
          data={{ st: operand1, sts: setOperand1 }}
          required={true}
        />
        <Input
          type="number"
          placeholder="Operand two"
          data={{ st: operand2, sts: setOperand2 }}
        />

        <Button action="calculate" title="Calculate" onClick={calculate} />
      </div>
    </div>
  );
}

export default App;
