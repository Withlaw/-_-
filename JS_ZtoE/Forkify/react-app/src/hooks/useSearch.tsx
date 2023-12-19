import { axiosInstance } from "@/adapters/axios";
import HttpClient from "@/adapters/httpClient";
import { API_BASE_URL } from "@/utils/constants";
import React, { useRef, useState } from "react";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchElementRefTarget = useRef<HTMLInputElement | null>(null);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { value } = searchElementRefTarget.current as HTMLInputElement;

    setSearchTerm(value);
  };

  return { searchElementRefTarget, searchTerm, handleSearchSubmit };
};

export default useSearch;
