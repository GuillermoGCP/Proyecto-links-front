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
import Scroll from "../components/Scroll";

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

  const orderFilteredLinks = filteredLinks.sort((a, b) => {
    return b.id - a.id;
  });

  return (
    <main className="min-h-screen">
      <section className="max-w-2xl mx-auto mt-8 p-4">
        <PostLink addNewLink={addNewLink} />
      </section>

      <section className="max-w-2xl mx-auto mt-8 p-4">
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
            <div className="max-w-60 mb-8 mx-auto">
              <Button
                handler={() => {
                  setInputValue("");
                  setSearchParams({ q: "" });
                }}
              >
                Reiniciar búsqueda
              </Button>
            </div>
          </>
        )}
      </section>

      <section className="flex justify-center">
        <ul className="w-11/12 flex flex-wrap justify-center items-start">
          {orderFilteredLinks ? (
            orderFilteredLinks.map((link) => (
              <li
                key={link.id}
                style={{ width: "370px" }}
                className="m-4 p-4 rounded-xl shadow-lg hover:shadow-2xl bg-slate-100/40 hover:scale-95 transition-transform"
              >
                <OneLink
                  key={link.id}
                  link={link}
                  changeRating={changeRating}
                />
                <div className="mt-10">
                  <Button
                    handler={() => {
                      goToLinkDetails(link.id);
                    }}
                  >
                    Ve al Post
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <NoLinksToday />
          )}
        </ul>
      </section>
      <Scroll />
    </main>
  );
};

export default MainPage;
