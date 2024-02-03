import React, { useContext } from "react";
import useLinksToday from "../hooks/useLinksToday";
import NoLinksToday from "./NoLinksToday";
import OneLink from "./OneLink";
import { tokenContext } from "../contexs/tokenContext";
import { useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import Search from "./Search";
import Button from "./Button";
const LinksToday = () => {
  const [tokenState] = useContext(tokenContext);
  const navigate = useNavigate();
  const { today, changeRating2 } = useLinksToday();
  const {
    filteredLinks,
    searchHandler,
    setSearchParams,
    inputValue,
    setInputValue,
  } = useSearch(today);
  React.useEffect(() => {
    if (!tokenState) {
      navigate("/");
    }
  }, [tokenState, navigate]);
  return (
    <section className="max-w-2xl min-h-screen mx-auto mt-8 p-4">
      <Search
        handler={searchHandler}
        inputValue={inputValue}
        placeholder="Buscador"
      />
      <div className="p-5 max-w-44 mx-auto">
        <Button
          handler={() => {
            setInputValue("");
            setSearchParams({ q: "" });
          }}
        >
          Reiniciar búsqueda
        </Button>
      </div>
      <ul>
        {filteredLinks ? (
          filteredLinks.map((link) => (
            <div
              key={link.id}
              className="p-4 hover:scale-95 transition-transform"
            >
              <OneLink
                key={link.id}
                link={link}
                changeRating2={changeRating2}
              />
              <div className="p-5 max-w-xs mx-auto"></div>
            </div>
          ))
        ) : (
          <NoLinksToday />
        )}
      </ul>
    </section>
  );
};

export default LinksToday;
