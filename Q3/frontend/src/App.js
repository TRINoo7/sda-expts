import React from "react"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import About from './components/About.js'
import Semester from './components/Semester.js'
import Semester7 from './components/Semester7.js'
import Home from './components/Home.js'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/q3/about' element={<About/>}/>
      <Route path='/q3/semester' element={<Semester/>}/>
      <Route path='/q3/semester/sem7' element={<Semester7/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
