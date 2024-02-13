import "./App.css";
import CalculatorButtons from "./Components/CalculatorButton";
import { useState } from "react";
function App() {
  const [screenValue, setScreenValue] = useState("0");
  const [dotCount, setDotCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const handleDotCount = () => {
    setDotCount((prev) => prev + 1);
  };

  const handleAddScreenValue = (value) => {
    if (value === "0") {
      handleZero();
    } else if (!isNaN(Number(value))) {
      handleNumber(value);
    } else if (value === "C") {
      handleClear();
    } else if (value === ".") {
      handleDot();
    } else if (value === "=") {
      handleCalculate();
    } else {
      handleOperators(value);
    }
  };

  const handleNumber = (value) => {
    if (screenValue.length === 1 && screenValue[0] === "0") {
      setScreenValue(value);
    } else {
      setScreenValue((prev) => prev + value);
    }
  };

  const handleZero = () => {
    if (screenValue.length === 1) {
      return;
    } else {
      setScreenValue((prev) => prev + "0");
    }
  };

  const handleClear = () => {
    setScreenValue("0");
    setDotCount(0);
  };

  const handleDot = () => {
    handleDotCount();
    setScreenValue((prev) => {
      if (prev.length === 1) {
        return prev + ".";
      } else if ("+-*/".includes(prev[prev.length - 1])) {
        return prev;
      } else if (prev[prev.length - 1] !== "." && dotCount < 1) {
        return prev + ".";
      } else {
        return prev;
      }
    });
  };

  const handleCalculate = () => {
    const prevValue = screenValue[screenValue.length-1];
    if(prevValue === "." || "+-*/".includes(prevValue)){
      setErrorMessage("Make sure last value doesn't end with . or any of the math operators")
    }else{
      setScreenValue((prev) => eval(prev));
      setErrorMessage("")
    }
    setDotCount(0);
  };

  const handleOperators = (operator) => {
    const prevValue = screenValue[screenValue.length - 1];
    if (screenValue.length === 1) {
      setScreenValue((prev) => prev + operator);
    } else if (prevValue === "." || "+-*/".includes(prevValue)) {
      return prev;
    } else {
      setScreenValue((prev) => prev + operator);
      setDotCount(0);
    }
  };
  return (
    <main className="h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-2xl text-center text-red-500">{errorMessage}</h1>
      <div className="calculator__container rounded-ss-2xl rounded-se-2xl flex flex-col gap-1 max-w-80 w-full bg-gray-500">
        <div className="calculator__screen text-white p-3 flex items-center justify-end">
          {screenValue}
        </div>
        <CalculatorButtons onButtonClick={(e) => handleAddScreenValue(e)} />
      </div>
    </main>
  );
}

export default App;
