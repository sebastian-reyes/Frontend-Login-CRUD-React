import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/"/>
        <Route path="/menu"/> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
