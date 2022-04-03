import logo from "./logo.svg"
import "./App.css"
import Todos from "./Components/Todos"
import AddTodo from "./Components/AddTodo"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client"

import CompletedTodos from "./Components/CompletedTodos"
import InCompletedTodos from "./Components/InCompletedTodos."
import Info from "./Components/Info"

function App() {
  return (
    <div className="App">
      <Router>
        <AddTodo />
        <Routes>
          <Route index element={<Todos />}>
            {" "}
          </Route>
          <Route path="/completed" element={<CompletedTodos />}>
            {" "}
          </Route>
          <Route path="/in_completed" element={<InCompletedTodos />}>
            {" "}
          </Route>
        </Routes>
        <Info />
      </Router>
    </div>
  )
}

export default App
