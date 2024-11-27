import './App.css'
import AddTodo from './components/Add/Add'
import Forget from './components/Forget/Forget'
import Update from './components/Update/Update'
import Home from './page/Home/Home'
import Login from './page/Login/Login'
import { Route, Routes } from 'react-router-dom'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/home' element={<Home/>}/>
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path='/forget' element={<Forget/>}/>
      </Routes>

    </>
  )
}

export default App
