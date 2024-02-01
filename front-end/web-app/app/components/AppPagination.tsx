"use client";
import { Pagination } from "flowbite-react";
import React, { useState } from "react";
interface Props {
  currentPage: number;
  totalPages: number;
  pageChanged: (page: number) => void;
}

const AppPagination = ({ currentPage, totalPages, pageChanged }: Props) => {
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={(e) => pageChanged(e)}
      totalPages={totalPages}
      layout="pagination"
      showIcons={true}
      className=" text-blue-500 mb-5"
    />
  );
};

export default AppPagination;
