import React, { useContext } from "react";
import Header from "./component/Header";
import { ThemeContext } from "./component/Provider";
import FloatingMenu from "./component/FloatingMenu";

function App() {
  const context = useContext(ThemeContext);
  return (
    <main
      className="main-container  position-relative"
      data-theme={context.theme}>
      <FloatingMenu />
      <Header />
    </main>
  );
}

export default App;
