import { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ResalePage from "./components/ResalePage";
import ResaleList from "./components/ResaleListPage";
import { SharedDataProvider } from "./components/SharedData";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SharedDataProvider>
        <Switch>
          <Route path="/" exact>
            <ResalePage />
          </Route>
          <Route path="/list" exact>
            <ResaleList />
          </Route>
        </Switch>
      </SharedDataProvider>
    </ChakraProvider>
  );
}

export default App;
