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
