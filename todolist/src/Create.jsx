import {React, useState} from 'react'
import axios from 'axios'

const Create = () => {

  const [task, setTask] = useState('')

  const handleAdd = () => {
    axios.post("http://localhost:3000/add", {task:task})
    .then(result => {
      location.reload()
    })
    .catch((err) => console.log(err))
  }

  const myStyle = {
    width: "300px",
    padding: "10px",
    borderBottom: "2px solid",
    outline: "none"
  }

  const myStyle2 = {
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
  }

  return (
    <div>
        <input type="text" placeholder="Enter Task" style={myStyle} onChange={(e) => setTask(e.target.value)}/>
        <button type="submit" style={myStyle2} onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
