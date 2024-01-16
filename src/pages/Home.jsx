import Button from "../components/Button";
import Navigation from "../components/Navigation";
import PostLink from "../components/PostLink";
import useDeleteLink from "../hooks/useDeleteLink";

const Home = () => {
  const { deleteHandler } = useDeleteLink(17);
  return (
    <>
      <h1 className="text-blue-900">Página principal</h1>
      <Navigation />
      <PostLink />
      <Button handler={deleteHandler}>Eliminar link</Button>
    </>
  );
};
export default Home;
