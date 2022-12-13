import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Select from "react-select";
import axios from "axios";

function App() {
  const [operation, setOperation] = useState("+");
  const [operand1, setOperand1] = useState(0);
  const [operand2, setOperand2] = useState(0);

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
    axios
      .post("http://localhost:8000/api/v1/math", {
        operand1: parseFloat(operand1),
        operand2: parseFloat(operand2),
        operation: operation,
      })
      .then((res) => {
        console.warn(res);
        setResult(res.data.data);
      })
      .catch((err) => console.log(err, "error"));
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
    <div>
      <h1 className="text-3xl font-medium" id="_calculate_page">
        Calculate
      </h1>
      {error !== "" && (
        <div className="py-10 text-red-500 w-[400px]" id="ErrorMessage">
          {error}
        </div>
      )}
      {isSuccess && (
        <div
          className="py-10 text-lg text-green-500 w-[400px]"
          id="SuccessMessage"
        >
          Sucessfully Calculated :{result} ..
        </div>
      )}
      <div>
        <Select
          defaultValue={operation}
          onChange={(value) => handleSelectChange({ ...value })}
          options={options}
        />
        <Input
          type="number"
          placeholder="Operand one"
          data={{ st: operand1, sts: setOperand1 }}
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
