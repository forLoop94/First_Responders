import React from "react";
import Search from "./Search";

const SearchInput: React.FC = () => {
  return (
    <div className="input input-sm hidden lg:flex justify-between items-center w-full">
      <Search />
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default SearchInput;
