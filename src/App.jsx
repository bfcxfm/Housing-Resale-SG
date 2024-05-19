import { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ResalePage from "./components/ResalePage";
import ResaleList from "./components/ResaleListPage";

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path="/" exact>
          <ResalePage />
        </Route>
        <Route path="/list" exact>
          <ResaleList />
        </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
