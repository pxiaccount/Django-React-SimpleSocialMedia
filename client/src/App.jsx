import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    photo: ''
  })
  const [darkTheme, setDarkTheme] = useState(true)

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

  const handleEdit = (x) => {
    setEditing(x.id)
    setEditForm({
      title: x.title,
      description: x.description,
      photo: x.photo,
    })
  }

  const handlePOST = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('description', editForm.description);
      formData.append('photo', editForm.photo);

      const response = await axios.post('http://localhost:8000/api/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData([...data, response.data]);
      setCreating(false);
      setEditForm({ title: '', description: '', photo: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/${id}/`, editForm)
      setData(data.map(item =>
        item.id === id ? response.data : item
      ))
      setEditing(null)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/${id}/`)
      setData(data.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <>
      <div className={`min-h-screen py-8 px-4 sm:px-7 lg:px-8 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
        <button
          onClick={toggleDarkTheme}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkTheme ? '☀️' : '🌙'}
        </button>
        <div className='max-w-100 mx-auto'>
          <div className='flex justify-center mb-5'>
            {creating ? (
              <div className="space-y-4 w-full max-w-md">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter description"
                />
                <input
                  type="file"
                  onChange={(e) => setEditForm({ ...editForm, photo: e.target.files[0] })}
                  className='p-2 bg-blue-500 rounded-lg'
                />
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={handlePOST}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setCreating(false)
                      setEditForm({ title: '', description: '' })
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setCreating(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
              >
                Create New Post
              </button>
            )}
          </div>
          {data.map((x) => (
            <div key={x.id} className="bg-blue-500 p-7 pb-60 border text-center m-2">
              <h2 className='font-bold text-xl'>{x.title}</h2>
              <img src={x.photo} />
              {editing === x.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(x.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(x)}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 m-3"
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(x.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 m-3"
              >
                Delete
              </button>
            </div>
          ))}

        </div>
      </div >
    </>
  )
}

export default App
