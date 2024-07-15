import {React, useState, useEffect} from 'react'
import Create from "./Create"
import axios from 'axios'

const myStyle = {
  display: "flex",
  alignItems: "center",
  width: "361px",
  justifyContent: "space-between",
  backgroundColor: "black",
  color: "white",
  height: "35px",
  padding: "2px 5px 2px 5px",
  marginTop: "10px"
}

const myStyle2 = {
  color: "white",
  cursor: "pointer",
  padding: "2px"
}

const Home = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
      axios.get("http://localhost:3000/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
      axios.put(`http://localhost:3000/update/${id}`)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
    }

      const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`)
        .then(result => {
          location.reload()
        })
        .catch(err => console.log(err))
      }

  return (
    <div>
       <h2>Todo List</h2>
       <Create />
       {
        todos.length === 0 ?  
        <div><h2>No Record</h2></div>
        :
        todos.map(todo => (
            <div style={myStyle}>
                <p>{todo.task}</p>
                <span style={myStyle2}>
                  <button onClick={() => handleEdit(todo._id)}>Mark</button>
                </span>
                 <span style={myStyle2}>
                  <button onClick={() => handleDelete(todo._id)}>
                    Delete
                  </button>
                 </span>
                 {todo.done === true ? <span>Completed</span> : <span>Pending</span>}
            </div>
        ))
       }
    </div>
  )
}

export default Home
