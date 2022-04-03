import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client"

const GET_All_TODOS = gql`
  query get_All_Todos {
    todos {
      id
      completed
      title
    }
  }
`



const GET_All_COMPLETED_TODOS = gql`
  query get_all_completed_todos {
    todos(where: {completed: {_eq: true}}) {
      completed
      id
      title
    }
  }
`

const GET_All_IN_COMPLETED_TODOS = gql`
  query get_all_in_completed_todos {
    todos(where: {completed: {_eq: false}}) {
      completed
      id
      title
    }
  }
`

const ADD_TODO_MUTATION = gql`
  mutation insertTodo($title: String, $completed: Boolean) {
    insert_todos_one(object: {title: $title, completed: $completed}) {
      id
      title
      completed
    }
  }
`

const UPDATE_TODO_BY_STATUS_MUTATION = gql`
  mutation updateTodo($completed: Boolean, $id: Int!) {
    update_todos_by_pk(pk_columns: {id: $id}, _set: {completed: $completed}) {
      id
      title
      completed
    }
  }
`

const DELETE_COMPLETED_TODOS_MUTATION = gql`
  mutation delete_completed_todos {
    delete_todos(where: {completed: {_eq: true}}) {
      returning {
        completed
        id
        title
      }
    }
  }
`

const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($id: Int!) {
    delete_todos_by_pk(id: $id) {
      completed
      id
      title
    }
  }
`

export {
  GET_All_TODOS,
  ADD_TODO_MUTATION,
  UPDATE_TODO_BY_STATUS_MUTATION,
  GET_All_COMPLETED_TODOS,
  GET_All_IN_COMPLETED_TODOS,
  DELETE_COMPLETED_TODOS_MUTATION,
  DELETE_TODO_MUTATION,
}
