import { useCartStore } from "../zustand/store";

function CalculateCart() {
  const { countItemArr, totalCountItems, subtotal, taxes, total } =
    useCartStore((state) => state);
  const { handleclearItems } = useCartStore((state) => state.actions);

  return (
    <div className="cleart_cart">
      <button
        role="button"
        onClick={handleclearItems}
        className="clear_cart_button"
      >
        Clear Cart
      </button>
      <div>
        {countItemArr.map((item) => (
          <div>
            <h2>
              {item.count} {item.name}
            </h2>
          </div>
        ))}
        <p>
          Total number of items: <span>{totalCountItems}</span>
        </p>
        <p>
          Subtotal <span>{subtotal}</span>
        </p>
        <p>
          Taxes <span>{taxes}</span>
        </p>
        <p>
          Total <span>{total}</span>
        </p>
      </div>
    </div>
  );
}

export default CalculateCart;
