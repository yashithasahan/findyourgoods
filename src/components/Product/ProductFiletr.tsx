import React, { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { Product } from "../../types/types";

interface ProductFilterProps {
  products: Product[];
  onFilteredProducts: (filteredProducts: Product[]) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  onFilteredProducts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1] &&
          (selectedCategory ? product.category === selectedCategory : true)
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "priceAsc":
            return a.price - b.price;
          case "priceDesc":
            return b.price - a.price;
          case "nameAsc":
            return a.name.localeCompare(b.name);
          case "nameDesc":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [products, searchTerm, priceRange, sortBy, selectedCategory]);

  React.useEffect(() => {
    onFilteredProducts(filteredProducts);
  }, [filteredProducts, onFilteredProducts]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    return ["", ...uniqueCategories];
  }, [products]);

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 1000]);
    setSortBy("");
    setSelectedCategory("");
  };

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <h3 className="text-lg font-semibold">Filter & Sort</h3>
        <button
          className="btn btn-ghost"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? <X size={24} /> : <Filter size={24} />}
        </button>
      </div>

      <div className="space-y-4">
        <div className="w-full">
          <div className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-square">
              <Search />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-control w-full">
            <select
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
              <option value="nameDesc">Name: Z to A</option>
            </select>
          </div>

          <div className="form-control w-full">
            <div className="flex flex-col">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                className="range range-primary"
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
              />
              <div className="flex justify-between text-xs px-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="form-control w-full">
            <select
              className="select select-bordered"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.filter(Boolean).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="btn btn-outline btn-primary"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
