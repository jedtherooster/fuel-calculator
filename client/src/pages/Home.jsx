// add comma support for retardslike jack
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FuelTypeButton from "../components/FuelTypeButton";
import Navbar from "../components/Navbar";
import FuelPrices from "../components/FuelPrices";
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
  const [lastFuelPrice, setLastFuelPrice] = useState(null);

  const fetchFuelPrice = async () => {
    try {
      const response = await axios.get("/retrieve-fuel-data");
      setLastFuelPrice(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFuelPrice(); // run immediately

    const interval = setInterval(() => {
      fetchFuelPrice();
    }, 600000); // 10 minutes

    return () => clearInterval(interval); // cleanup
  }, []);

  const handleClick = () => {
    try {
      const distance = Number(formData.distance);
      const fuelEcon = Number(formData.fuelEcon);
      const fuelPrice = Number(lastFuelPrice[selectedFuel]);

      if (isNaN(distance) || isNaN(fuelEcon) || isNaN(fuelPrice)) {
        alert("One of your values is invalid.");
        return;
      }

      const cost = (distance / 100) * fuelEcon * fuelPrice;

      navigate("/travel-costs", {
        state: {
          fuelData: cost.toFixed(2),
          travelDistance: distance,
        },
      });
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
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Fetching latest fuel prices...</p>
        </div>
      )}

      <Navbar />

      <div className="container">
        <FuelPrices fuelPrice={lastFuelPrice} refreshPrices={fetchFuelPrice} />

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
              !selectedFuel ||
              !formData.distance ||
              !formData.fuelEcon ||
              !lastFuelPrice
            }
            onClick={handleClick}
            className="button"
          >
            Calculate Cost
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
