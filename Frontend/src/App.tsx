import { useState } from "react";
import "./App.css";
import Header from "./components/ModalWindows/Header/Header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div>
      <Header title="My Task Board"/>
      <Homepage/>
    </div>

  );
}

export default App;