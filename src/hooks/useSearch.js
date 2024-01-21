import { useSearchParams } from "react-router-dom";
const useSearch = (state) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const searchHandler = (e) => {
    e.preventDefault();
    const info = e.target.value;
    const queryData = {
      q: info,
    };
    setSearchParams(queryData);
  };

  const filteredState = state.filter((link) => {
    return (
      link.title.toLowerCase().includes(q.toLowerCase()) ||
      link.description.toLowerCase().includes(q.toLowerCase()) ||
      link.url.toLowerCase().includes(q.toLocaleLowerCase())
    );
  });
  return { filteredState, searchHandler };
};
export default useSearch;