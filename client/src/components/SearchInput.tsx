import React from "react";
import Search from "./Search";

interface ISearchInputProps {
  dimension: string;
  display?: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({ dimension, display }) => {
  return (
    <div className={`${display} lg:block`}>
      <div className="join">
        <input
          className={`input input-${dimension} join-item`}
          placeholder="Search"
        />
        <button
          className={`btn btn-${dimension} join-item border-1 border-bg-base-100`}
        >
          <Search />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
