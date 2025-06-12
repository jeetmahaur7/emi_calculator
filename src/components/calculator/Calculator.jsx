import { useEffect, useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [principal, setPrincipal] = useState(0);
  const [year, setYear] = useState(0);
  const [intrest, setIntrest] = useState(0);
  const [emi, setEMI] = useState(0);

  function handleChange(e) {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "principal") setPrincipal(value);
    else if (id === "intrest") setIntrest(value);
    else setYear(value);
  }

  function calculateEMI() {
    let r = intrest;
    if (principal && r && year) {
      r = r / 12 / 100;
      const calPow = Math.pow(1 + r, year * 12);
      const amount = principal * ((r * calPow) / (calPow - 1));
      setEMI(Math.round(amount));
    }
  }
  useEffect(() => {
    calculateEMI();
  }, [principal.intrest, year]);

  return (
    <>
      <div className="loan-calc">
        <h1>EMI Calculator</h1>
        <div className="inputs">
          <p>Principle: </p>
          <input onChange={handleChange} type="number" id="principal" />
          <p>Intrest: </p>
          <input onChange={handleChange} type="number" id="intrest" />
          <p>Years: </p>
          <input onChange={handleChange} type="number" id="year" />
        </div>
        <div className="output">Your EMI is {emi}</div>
      </div>
    </>
  );
}
