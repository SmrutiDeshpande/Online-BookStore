import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import register from './components/mainpages/cart/register'



function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
       
      </Router>
      
    </DataProvider>
    

    
  );
}

export default App;
