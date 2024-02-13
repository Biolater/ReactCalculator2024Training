const allButtonTypes = [
  ["C", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];
const CalculatorButtons = ({ onButtonClick }) => {
  return allButtonTypes.map((row, idx) => (
    <section key={idx} className="calculator__row flex gap-1">
      {row.map((buttonType) => (
        <button
          onClick={() => onButtonClick(buttonType)}
          key={buttonType}
          className={`calculator__button ${
            buttonType === "C"
              ? "basis-58 flex-grow"
              : buttonType === "0"
              ? "basis-38 flex-grow"
              : "basis-1/5 flex-grow"
          }`}
        >
          {buttonType}
        </button>
      ))}
    </section>
  ));
};

export default CalculatorButtons;
