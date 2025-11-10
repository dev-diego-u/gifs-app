import { useState } from "react";

// Define lo que retorna el hook
export interface UseCounterReturn {
  counter: number; // contador
  handleAdd: () => void; // +1
  handleSubtract: () => void; // -1
  handleReset: () => void; // reset
}

// Hook contador
export const useCounter = (initialValue: number): UseCounterReturn => {
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => setCounter(counter + 1); // suma
  const handleSubtract = () => setCounter(counter - 1); // resta
  const handleReset = () => setCounter(initialValue); // resetea

  return {
    counter,
    handleAdd,
    handleSubtract,
    handleReset,
  };
};
