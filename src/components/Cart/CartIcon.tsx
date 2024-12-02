// components/CartIcon.tsx
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const CartIcon: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="">
      <button className="btn btn-primary btn-circle shadow-lg relative">
        <ShoppingCart size={24} />
        {totalQuantity > 0 && (
          <span className="badge badge-sm badge-secondary absolute top-0 right-0">
            {totalQuantity}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartIcon;
