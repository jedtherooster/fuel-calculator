function FuelPrices({ fuelPrice, refreshPrices }) {
  const fuels = ["91", "95", "98", "Diesel"];

  return (
    <div className="price-container">
      <h2>Current Fuel Prices</h2>

      <div className="prices">
        {fuels.map((fuel) => (
          <div className="fuel-price" key={fuel}>
            <p>{fuel}</p>
            <p className="price">{fuelPrice?.[fuel] ?? "..."}</p>
          </div>
        ))}
      </div>

      <button onClick={refreshPrices} className="refresh-button">
        Refresh
      </button>
    </div>
  );
}

export default FuelPrices;
