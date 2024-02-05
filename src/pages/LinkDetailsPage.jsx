import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PageNotFound from "./PageNotFound";
import EmbeddedPage from "./EmbeddedPage";
import DropDown from "../components/DropDown";

const LinkDetailsPage = () => {
  const location = useLocation();
  const dataLink = location?.state?.mainPageState || [];
  const { id } = useParams();
  const link = dataLink.find((p) => p.id === Number(id));

  if (!link) return <PageNotFound />;

  return (
    <main className=" m-20 bg-gray-100">
      <section className="flex p-4 ">
        <DropDown link={link} />

        <div className="ml-4 bg-white p-16 rounded shadow-md flex items-center overflow-hidden">
          <EmbeddedPage link={link} />
        </div>
      </section>
    </main>
  );
};

LinkDetailsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      mainPageState: PropTypes.array,
    }),
  }),
};

export default LinkDetailsPage;
