import React from "react";
import fuel91 from "../assets/91-fuel-symbol.png";
import fuel95 from "../assets/95-fuel-symbol.png";
import fuel98 from "../assets/98-fuel-symbol.png";
import diesel from "../assets/diesel-fuel-symbol.png";

const fuelImages = {
  91: fuel91,
  95: fuel95,
  98: fuel98,
  Diesel: diesel,
};

const FuelTypeButton = ({ selectedFuel, setSelectedFuel }) => {
  const fuels = ["91", "95", "98", "Diesel"];

  const handleClick = (fuel) => {
    setSelectedFuel(selectedFuel === fuel ? null : fuel);
  };

  return (
    <>
      {fuels.map((fuel) => (
        <div
          key={fuel}
          className={`fuel-button ${selectedFuel === fuel ? "active" : ""}`}
          onClick={() => handleClick(fuel)}
        >
          <img src={fuelImages[fuel]} alt={`${fuel} symbol`} />
        </div>
      ))}
    </>
  );
};

export default FuelTypeButton;
