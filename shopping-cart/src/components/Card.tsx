import { Product } from "../type.";
import { useCartStore } from "../zustand/store";

type CardProps = {
  item: Product;
};

function Card({ item }: CardProps) {
  const { handleaddItems } = useCartStore((state) => state.actions);

  return (
    <div key={item.id} className="card">
      <h2>{item.name}</h2>
      <p>{item.price}</p>
      <p>Cateogory: {item.category}</p>
      <button role="button" onClick={() => handleaddItems(item)}>
        Add To Cart
      </button>
    </div>
  );
}

export default Card;
