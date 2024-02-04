import React from "react";
import OneLink from "../components/OneLink";
import { useNavigate } from "react-router-dom";
import PostLink from "../components/PostLink";
import useSearch from "../hooks/useSearch";
import Search from "../components/Search";
import Button from "../components/Button";

import useAllLinks from "../hooks/useAlllinks";
import NoLinksToday from "../components/NoLinksToday";
import { ClockLoader } from "react-spinners";

const MainPage = () => {
  const { state, tokenState, addNewLink, changeRating, loading } =
    useAllLinks();
  const {
    filteredLinks,
    searchHandler,
    setSearchParams,
    inputValue,
    setInputValue,
  } = useSearch(state);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!tokenState) {
      navigate("/");
    }
  }, [tokenState, navigate]);

  const goToLinkDetails = (id) => {
    navigate(`/${id}`, { state: { mainPageState: state } });
  };

  //Ordeno los id de mayor a menor para que aparezpan arriba los últimos creados
  const orderFilteredLinks = filteredLinks.sort((a, b) => {
    return b.id - a.id;
  });

  return (
    <section className="max-w-2xl mx-auto mt-8 p-4">
      <PostLink addNewLink={addNewLink} />
      <Search
        handler={searchHandler}
        inputValue={inputValue}
        placeholder="Buscador"
      />
      {loading ? (
        <>
          <p className="text-2xl font-bold text-center text-gray-700 mb-4 mt-14">
            Cargando enlaces
          </p>
          <div className="flex justify-center items-center">
            <ClockLoader color="#4f46e5" size={50} />
          </div>
        </>
      ) : (
        <>
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
            {orderFilteredLinks && orderFilteredLinks.length > 0 ? (
              orderFilteredLinks.map((link) => (
                <div key={link.id} className="p-4 border-2 border-x-slate-200">
                  <OneLink
                    key={link.id}
                    link={link}
                    changeRating={changeRating}
                  />
                  <div className="p-5 max-w-xs mx-auto">
                    <Button
                      handler={() => {
                        goToLinkDetails(link.id);
                      }}
                    >
                      Ve al Post
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <NoLinksToday />
            )}
          </ul>
        </>
      )}
    </section>
  );
};

export default MainPage;
