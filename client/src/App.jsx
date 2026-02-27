import { useState, useRef } from "react";
import FuelTypeButton from "./components/FuelTypeButton";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [formData, setFormData] = useState({
    distance: "",
    fuelEcon: "",
  });

  const lastFuelPrice = useRef(null);

  const handleClick = async () => {
    try {
      const currentTime = new Date().getMinutes();

      console.log(lastFuelPrice);
      if (currentTime % 10 === 0 || !lastFuelPrice.current) {
        console.log("If statement ran");
        const response = await axios.get("/retrieve-fuel-data");
        lastFuelPrice.current = response.data;
      }

      const distance = Number(formData.distance);
      const fuelEcon = Number(formData.fuelEcon);
      const fuelPrice = Number(lastFuelPrice.current[selectedFuel]);

      if (isNaN(distance) || isNaN(fuelEcon) || isNaN(fuelPrice)) {
        alert("One of your values is 0 or invalid.");
        return;
      }

      const cost = (distance / 100) * fuelEcon * fuelPrice;

      alert("Cost: $" + cost.toFixed(2));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="fuel-options">
        <FuelTypeButton
          selectedFuel={selectedFuel}
          setSelectedFuel={setSelectedFuel}
        />
      </div>

      <div className="fuel-econ text-overlay">
        <input
          type="number"
          name="fuelEcon"
          placeholder="Litres"
          value={formData.fuelEcon}
          onChange={handleChange}
        />
        <span>/100km</span>
      </div>

      <div className="travel-distance text-overlay">
        <input
          type="text"
          name="distance"
          placeholder="Distance"
          value={formData.distance}
          onChange={handleChange}
        />
        <span>km</span>
      </div>

      <div className="calculate">
        <button
          disabled={!selectedFuel || !formData.distance || !formData.fuelEcon}
          onClick={handleClick}
          className="calc-button"
        >
          Calculate Cost
        </button>
      </div>
    </div>
  );
}

export default App;
