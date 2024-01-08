import Navigation from "./Navigation";
import TestNav from "./TestNav";

const Layout = (props) => {
  return (
    <>
      <TestNav />
      {/* <Navigation /> */}
      <main className="flex items-center justify-center h-4/6">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
