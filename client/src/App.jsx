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
      <div className='min-h-screen py-8 px-4 sm:px-7 lg:px-8'>
        <div className='max-w-100 mx-auto'>
          {data.map((x) => (
            <div key={x.id} className="bg-blue-500 p-7 h-100 border text-center m-2">
              <h2>{x.title}</h2>
              <p>{x.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
