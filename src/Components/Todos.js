import React, {useState, useEffect} from "react"
import {
  GET_All_TODOS,
  UPDATE_TODO_BY_STATUS_MUTATION,
  GET_All_COMPLETED_TODOS,
  GET_All_IN_COMPLETED_TODOS,
  DELETE_COMPLETED_TODOS_MUTATION,
  DELETE_TODO_MUTATION,
} from "../Queries/TodosQueries"
import {useMutation, useQuery} from "@apollo/client"
import {useNavigate} from "react-router-dom"

function Todos() {
  const navigate = useNavigate()

  const {loading, error, data} = useQuery(GET_All_TODOS)

  const [updateTodo, {loading: loading1, error: error1}] = useMutation(
    UPDATE_TODO_BY_STATUS_MUTATION
  )

  const [deleteTodo, {loading: loading2, error: error2}] =
    useMutation(DELETE_TODO_MUTATION)

  if (loading)
    return (
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    )
  if (error) console.log("kkkkk", error.graphQLErrors)

  if (loading1) return <p className="text-center mt-2"> updating .</p>
  if (error1) console.log("kkkkk", error.graphQLErrors)

  if (loading2) return <p className="text-center mt-2"> deleting.</p>
  if (error2) console.log("kkkkk", error.graphQLErrors)

  const ChangeStatus = (e, Id) => {
    console.log("status", !e, data)

    updateTodo({
      variables: {
        id: Id,
        completed: !e,
      },
      refetchQueries: () => [
        GET_All_TODOS,
        "get_All_Todos ",
        GET_All_COMPLETED_TODOS,
        "get_all_completed_todos",
        GET_All_IN_COMPLETED_TODOS,
        "get_all_in_completed_todos",
      ]
    })
  }

  if (data) {
    return (
      <div className="todos">
        {data.todos.map((ET) => {
          return (
            <div className="todo">
              <input
                class="form-check-input"
                type="checkbox"
                checked={ET.completed ? true : false}
                onChange={(e) => ChangeStatus(ET.completed, ET.id)}
                id="flexCheckDefault"
              />
              <p className="text"> {ET.title} </p>
              <button
                className="btn btn-danger delete-btn btn-sm"
                onClick={() => {
                  deleteTodo({
                    variables: {
                      id: ET.id,
                    },
                    refetchQueries: [
                      GET_All_TODOS, // DocumentNode object parsed with gql
                      "get_All_Todos ", // Query name
                      GET_All_COMPLETED_TODOS, // DocumentNode object parsed with gql
                      "get_all_completed_todos", // Query name
                      GET_All_IN_COMPLETED_TODOS, // DocumentNode object parsed with gql
                      "get_all_in_completed_todos", // Query name
                    ],
                  })
                }}
              >
                {" "}
                delete
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Todos
