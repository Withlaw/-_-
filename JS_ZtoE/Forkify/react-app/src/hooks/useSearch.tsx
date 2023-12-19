import { axiosInstance } from "@/adapters/api/axios";
import { HttpClientAxios, HttpClientFetch } from "@/adapters/api";
import SearchService from "@/services/searchService";
import { API_BASE_URL, API_KEY } from "@/utils/constants";
import React, { useRef, useState } from "react";
import { RecipesType } from "@/model/search";

const httpClient = new HttpClientAxios(API_BASE_URL, axiosInstance);
// const httpClientf = new HttpClientFetch(API_BASE_URL);
const searchService = new SearchService(httpClient, API_KEY);

const useSearch = () => {
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const searchElementRefTarget = useRef<HTMLInputElement | null>(null);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { value } = searchElementRefTarget.current as HTMLInputElement;

    const { recipes } = await searchService.search<RecipesType>(value);

    console.log("search res data: ", recipes);

    // setSearchTerm(value);
  };

  // return { searchElementRefTarget, searchTerm, handleSearchSubmit };
  return { searchElementRefTarget, handleSearchSubmit };
};

export default useSearch;
