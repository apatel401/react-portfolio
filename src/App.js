import React, { useContext } from "react";
import Header from "./component/Header";
import { ThemeContext } from './component/Provider';


function App() {
  const context = useContext(ThemeContext);
  return (
    <main className="main-container" data-theme={context.theme}>
      {/* {console.log(context.theme)} */}
  <Header />
  </main>

  );
}

export default App;