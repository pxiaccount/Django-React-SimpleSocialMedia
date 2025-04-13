import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/')
        setData(response.data)
      } catch (error) {
        console.error('Error: ', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {data.map((x) => (
        <div key={x.id}>
          <h2>{x.title}</h2>
          <p>{x.description}</p>
        </div>
      ))}
    </>
  )
}

export default App
