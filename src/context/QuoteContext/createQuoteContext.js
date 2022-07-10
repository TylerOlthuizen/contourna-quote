import React, { useState } from 'react';

export function createQuoteContext() {
  const Context = React.createContext({
    name: 'QuoteContext',
    quote: {},
    step: 1,
    setStep: () => {
      return;
    },
    setQuote: () => {
      return;
    }
  });
  const name = 'QuoteContext';
  Context.displayName = name;

  const Provider = ({ children }) => {
    const [quote, setQuote] = useState({ name: 'quote' });
    const [step, setStep] = useState(1);
    return (
      <Context.Provider value={{ quote, setQuote, step, setStep }}>{children}</Context.Provider>
    );
  };

  return { Context, Provider };
}
