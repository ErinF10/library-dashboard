import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from "./Dashboard"
import Details from "./Details";

const App = () => {

    return (
        <Router >
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/details/:id' element={<Details/>} />
          </Routes>
        </Router>
    )
}

export default App