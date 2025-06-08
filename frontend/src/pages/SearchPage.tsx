import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SearchResultCard";
import { useState } from "react";
import SearchBar, { type SearchForm } from "../components/SearchBar";

export type SearchState = {
  searchQuery: string;
};

const SearchPage: React.FC = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const searchQuerySet = (searchFromData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFromData.searchQuery,
    }));
  };

  console.log("searchState", searchState);

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    // Return a loading indicator or skeleton screen for better UX
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg">Loading...</span>
      </div>
    );
  }

  if (!results?.data || !city) {
    return <div className="text-center">No results found</div>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines here :)</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={searchQuerySet}
          placeholder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <SearchResultInfo city={city} total={results.pagination.total} />
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
