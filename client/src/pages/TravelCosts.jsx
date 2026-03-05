import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function TravelCosts() {
  const location = useLocation();
  const navigate = useNavigate();
  const fuelPrice = location.state?.fuelData;
  const travelDistance = location.state?.travelDistance;

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <h2>It will cost you</h2>
        <h1>${fuelPrice}</h1>
        <h2>To travel {travelDistance}km</h2>
        <button className="button" onClick={handleClick}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default TravelCosts;
