import { useParams } from "react-router-dom";

const SearchPage: React.FC = () => {
  const { city } = useParams();
  return <div className="">{city}</div>;
};

export default SearchPage;
