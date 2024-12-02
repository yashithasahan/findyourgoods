import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "../features/cartSlice";
import ProductFilter from "../components/Product/ProductFiletr";
import { Product } from "../types/types";
import { productsData } from "../data/products";

const ProductList = () => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="container mx-auto my-4 px-4">
      <ProductFilter
        products={productsData}
        onFilteredProducts={setFilteredProducts}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-base-200 p-2">
        {(filteredProducts.length > 0 ? filteredProducts : productsData).map(
          (product) => (
            <motion.div
              key={product.id}
              className="card bg-base-100 shadow-xl"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <figure className="px-4 pt-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-xl object-cover h-48 w-full"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="card-actions justify-between items-center w-full">
                  <span className="text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          ...product,
                          quantity: 1,
                          price: product.price,
                        })
                      )
                    }
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
