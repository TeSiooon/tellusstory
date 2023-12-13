import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <>
      <Navigation />
      <main className="flex items-center justify-center h-screen">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
