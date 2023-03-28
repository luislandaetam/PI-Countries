import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";
import Activities from "./components/Activities/Activities.jsx";

function App() {
  return (
    <div>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/countries">
        <Home />
      </Route>
      <Route path="/countries/:id">
        <Detail />
      </Route>
      <Route exact path="/activities">
        <Activities />
      </Route>
      <Route path="/activities/create">
        <Form />
      </Route>
    </div>
  );
}

export default App;
