import "./App.css";
import CalculateCart from "./components/CalculateCart";
import Card from "./components/Card";
import { products } from "./data";
import { useStore } from "./zustand/store";

function App() {
  const isCartVsible = useStore((state) => state.isCartVisible);
  const { handlecart } = useStore((state) => state.actions);

  return (
    <>
      <div className="cleart_cart_container">
        <button className="cart_button" onClick={handlecart}>
          {isCartVsible ? "Hide Cart" : "Show Cart"}
        </button>
        {isCartVsible && <CalculateCart />}
      </div>

      <h1>Desserts Page</h1>
      <div className="container">
        {products.map((item) => {
          return <Card item={item} key={item.id} />;
        })}
      </div>
    </>
  );
}

export default App;
