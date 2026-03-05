import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FuelTypeButton from "../components/FuelTypeButton";
import axios from "axios";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [formData, setFormData] = useState({
    distance: "",
    fuelEcon: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      const currentTime = new Date().getMinutes();

      setLoading(true);

      const response = await axios.get("/retrieve-fuel-data");

      const distance = Number(formData.distance);
      const fuelEcon = Number(formData.fuelEcon);
      const fuelPrice = Number(response.data[selectedFuel]);

      if (isNaN(distance) || isNaN(fuelEcon) || isNaN(fuelPrice)) {
        alert("One of your values is 0 or invalid.");
        return;
      }

      const cost = (distance / 100) * fuelEcon * fuelPrice;
      navigate("/travel-costs", {
        state: { fuelData: cost.toFixed(2), travelDistance: distance },
      }); // redirect after success
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
    <div className={"container"}>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Fetching latest fuel prices...</p>
        </div>
      )}
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
          disabled={
            loading || !selectedFuel || !formData.distance || !formData.fuelEcon
          }
          onClick={handleClick}
          className="button"
        >
          Calculate Cost
        </button>
      </div>
    </div>
  );
}

export default Home;
