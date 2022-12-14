import React, { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import { toast } from 'react-toastify'

function Categories() {
  const state = useContext(GlobalState)
  const [categories] = state.categoriesAPI.categories
  const [category, setCategory] = useState('')
  const [token] = state.token
  const [callback, setCallback] = state.categoriesAPI.callback
  const [onEdit, setOnEdit] = useState(false)
  const [id, setID] = useState('')

  const createCategory = async (e) => {
    e.preventDefault()
    try {
      if (onEdit) {
        const res = await axios.put(`https://thivlevel-ecommerce-production.up.railway.app/api/category/${id}`, { name: category }, {
          headers: { Authorization: token }
        })
        toast.success(res.data.msg)
      } else {
        const res = await axios.post('https://thivlevel-ecommerce-production.up.railway.app/api/category', { name: category }, {
          headers: { Authorization: token }
        })
        toast.success(res.data.msg)
      }
      setOnEdit(false)
      setCategory('')
      setCallback(!callback)
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }

  const editCategory = async (id, name) => {
    setID(id)
    setCategory(name)
    setOnEdit(true)
  }

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`https://thivlevel-ecommerce-production.up.railway.app/api/category/${id}`, {
        headers: { Authorization: token }
      })
      alert(res.data.msg)
      setCallback(!callback)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  return (
    <div>
      <div className='content-header'>
        <h2>Category</h2>
      </div>

      <div className="content-wrapper">
        <div className="categories">
          <form onSubmit={createCategory}>
            <input type="text" name="category" value={category} required
              onChange={e => setCategory(e.target.value)}
            />

            <button type="submit">{onEdit ? "Update" : "Create"}</button>
          </form>

          <div>
            {
              categories.map(category => (
                <div className="row" key={category._id}>
                  <p>{category.name}</p>
                  <div>
                    <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                    <button onClick={() => deleteCategory(category._id)}>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories