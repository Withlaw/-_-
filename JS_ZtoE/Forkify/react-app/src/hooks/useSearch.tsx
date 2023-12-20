import { axiosInstance } from "@/adapters/api/axios";
import { HttpClientAxios, HttpClientFetch } from "@/adapters/api/http-client";
import RecipeService from "@/services/searchService";
import { API_BASE_URL, API_KEY } from "@/constants";
import React, { useRef, useState } from "react";
import { Recipe, RecipesType } from "@/features/recipe/model";

const httpClient = new HttpClientAxios(API_BASE_URL, axiosInstance);
const searchService = new RecipeService(httpClient, API_KEY);
// console.log(httpClient, searchService);

const useSearch = () => {
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const searchElementRefTarget = useRef<HTMLInputElement | null>(null);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { value } = searchElementRefTarget.current as HTMLInputElement;

    const recipes = await searchService.search<Recipe[]>(value);
    console.log("search res data: ", recipes);

    // setSearchTerm(value);
  };

  // return { searchElementRefTarget, searchTerm, handleSearchSubmit };
  return { searchElementRefTarget, handleSearchSubmit };
};

export default useSearch;
