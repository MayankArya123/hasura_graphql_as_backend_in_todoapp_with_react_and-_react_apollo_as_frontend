import React, {useState} from "react"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useMutation,
} from "@apollo/client"

import {
  ADD_TODO_MUTATION,
  GET_All_TODOS,
  UPDATE_TODO_BY_STATUS_MUTATION,
  GET_All_COMPLETED_TODOS,
  GET_All_IN_COMPLETED_TODOS,
} from "../Queries/TodosQueries"

function AddTodo() {
  const [Title, setTitle] = useState("")
  const [Id, setId] = useState(17)

  const [insertTodo, {data, loading, error}] = useMutation(ADD_TODO_MUTATION)

  const {refetch:refetch} = useQuery(GET_All_TODOS)
  const {refetch:refetch1} = useQuery(GET_All_IN_COMPLETED_TODOS)
  const {refetch:refetch2} = useQuery(GET_All_COMPLETED_TODOS)

  if (error) return `Submission error! ${error.message}`
  console.log(insertTodo)

  return  loading ?  <p className="text-center mt-2"> Submitting </p> : (
    <div className="add-todo">
      <input type="text" placeholder="create todo" onChange={(e) => setTitle(e.target.value)} />

      <button
        className="btn btn-sm btn-primary add-btn"
        onClick={() =>
          insertTodo({
            variables: {title: Title, id: Id, completed: false},
            refetchQueries: () => {
              refetch()
              refetch1()
              refetch2()
            }
          })
        }
      >
        add
      </button>
    </div>
  )
}

export default AddTodo
