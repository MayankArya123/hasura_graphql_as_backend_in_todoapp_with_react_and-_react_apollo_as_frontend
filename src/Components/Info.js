import React, {useState, useEffect} from "react"
import {
  GET_All_TODOS,
  UPDATE_TODO_BY_STATUS_MUTATION,
  GET_All_COMPLETED_TODOS,
  GET_All_IN_COMPLETED_TODOS,
  DELETE_COMPLETED_TODOS_MUTATION,
} from "../Queries/TodosQueries"
import {useMutation, useQuery} from "@apollo/client"
import {useNavigate} from "react-router-dom"

function Info() {
  const navigate = useNavigate()

  const {loading, error, data} = useQuery(GET_All_TODOS)

  const [delete_todos, {loading: loading1, error: error1}] = useMutation(
    DELETE_COMPLETED_TODOS_MUTATION
  )

  // const [ updateTodo, { loading:loading1, error:error1 }] = useMutation(UPDATE_TODO_BY_STATUS_MUTATION);

  if(loading1) return <p className="text-center mt-2" >deleting</p>
  if (error) console.log("kkkkk", error.graphQLErrors)

  if (data) {

    const results = data.todos.filter((ET) => {
      return ET.completed !== true
    })

    const CompletedResults = data.todos.filter((ET) => {
      return ET.completed === true
    })

    return (
      <div className="todos-footer">

      {

        data.todos.length > 0 && `${results.length} tasks left`

      }



        {

                  
        data.todos.length > 0 &&  <div className="tools">

        <button className="btn btn-info btn-sm" onClick={() => navigate("/")}>
        All{" "}
      </button>

        <button
        className="btn btn-info btn-sm"
        onClick={() => navigate("/in_completed")}
      >
        active{" "}
      </button>
   

      <button
        className="btn btn-info btn-sm"
        onClick={() => navigate("/completed")}
      >
        completed{" "}
      </button>


      {
          
        CompletedResults.length > 0 && 
        <button
          className="btn btn-warning btn-sm"
          onClick={() =>
            delete_todos({
              refetchQueries: [
                GET_All_TODOS, // DocumentNode object parsed with gql
                "get_All_Todos ", // Query name
                GET_All_COMPLETED_TODOS, // DocumentNode object parsed with gql
                "get_all_completed_todos", // Query name
                GET_All_IN_COMPLETED_TODOS, // DocumentNode object parsed with gql
                "get_all_in_completed_todos", // Query name
              ],
            })
          }
        >
          {" "}
          delete completed tasks
        </button>
    }



    </div>


        }

  
      </div>
    )
  }
}

export default Info
