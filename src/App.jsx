import React, { useState } from 'react';
import InputBox from './components/Input';
import useCurrencyInfo from './hooks/useCurrencyInfo';

const App = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const Options = Object.keys(currencyInfo);

  const swapCurrency = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount); // Update the converted amount when swapping
    setAmount(convertedAmount); // Set the amount to the converted amount after swap
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]); // Calculate conversion on the 'to' currency
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert(); // Trigger conversion on form submission
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={Options}
                onCurrencyChange={(currency) => setFrom(currency)} // Update from currency
                onAmountChange={(amount) => setAmount(amount)} // Update amount
                selectedCurrency={from} // Pass the 'from' currency as selectedCurrency
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swapCurrency} // Swap the currencies when clicked
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount} // Display the converted amount
                currencyOptions={Options}
                onCurrencyChange={(currency) => setTo(currency)} // Update to currency
                selectedCurrency={to} // Pass the 'to' currency as selectedCurrency
                amountDisabled // Disable amount input for 'To' currency
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
