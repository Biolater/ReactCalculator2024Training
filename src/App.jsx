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

  /**
   * Handles the value passed to the screen.
   * @param {string} value - The value to be handled.
   */
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

  /**
   * Handles the input of a number.
   * If the screen value is "0", it replaces it with the input value.
   * Otherwise, it appends the input value to the screen value.
   * @param {string} value - The number value to be handled.
   */
  const handleNumber = (value) => {
    if (screenValue.length === 1 && screenValue[0] === "0") {
      setScreenValue(value);
    } else {
      setScreenValue((prev) => prev + value);
    }
  };

  /**
   * Handles the click event for the zero button.
   * If the screen value has only one character, it does nothing.
   * Otherwise, it appends "0" to the screen value.
   */
  const handleZero = () => {
    if (screenValue.length === 1) {
      return;
    } else {
      setScreenValue((prev) => prev + "0");
    }
  };

  /**
   * Clears the screen value and resets the dot count.
   */
  const handleClear = () => {
    setScreenValue("0");
    setDotCount(0);
  };

  /**
   * Handles the addition of a dot to the screen value.
   * - Calls the handleDotCount function to increase the dot count value by 1.
   * - Checks the current screen value and determines the appropriate action:
   *   - If the screen value length is 1, adds a dot to the value.
   *   - If the previous value is a math operator, does nothing.
   *   - If the previous value is not a dot and the dot count is less than 1, adds a dot to the value.
   *   - Otherwise, returns the previous value without any changes.
   */
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

  /**
   * Handles the calculation based on the current screen value.
   * Checks if the last value doesn't end with '.' or any of the math operators.
   * If valid, evaluates the screen value and updates it.
   * Resets the error message and dot count.
   */
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

  /**
   * Handles the operators in the calculator.
   * @param {string} operator - The operator to be handled.
   */
  const handleOperators = (operator) => {
    const prevValue = screenValue[screenValue.length - 1];
    if (screenValue.length === 1) {
      setScreenValue((prev) => prev + operator);
    } else if (prevValue === "." || "+-*/".includes(prevValue)) {
      return prevValue;
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
