import { useCartStore } from "../zustand/store";

function CalculateCart() {
  const { itemArr, totalCountItems, subtotal, taxes, total } = useCartStore(
    (state) => state
  );
  console.log("carculate", itemArr);

  // console.log("ttt", totalCountItems, subtotal, taxes, total);

  return (
    <div>
      {itemArr.map((item) => {
        return <div>{item.name}</div>;
      })}
      <div>
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
