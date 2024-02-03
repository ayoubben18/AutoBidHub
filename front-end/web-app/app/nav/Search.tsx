"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore((state) => state.setParams);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);
  const [value, setValue] = useState("");

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }
  function search() {
    if (pathname !== "/") router.push("/");
    setParams({ searchTerm: searchValue });
  }
  return (
    <div>
      <input
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        value={searchValue}
        type="text"
        placeholder="Search ..."
        className="input rounded-xl input-bordered w-full input-error max-w-xl"
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Search;
