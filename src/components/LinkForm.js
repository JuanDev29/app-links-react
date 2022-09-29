import React, { useState } from 'react'

function LinkForm(props) {

  const initialStateValues = {
    url: '',
    name: '',
    description: ''
  }

  const [values, setValues] = useState(initialStateValues)

  const handleChange = (e) => {
    //console.log(e.target.name, e.target.value)
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addOrEditLink(values)
    setValues({...initialStateValues})
  }

  return (
      <form onSubmit={handleSubmit} className='card card-body'>

        <div className="form-group input-group my-1">
          <div className="input-group-text bg-light">
            <i className="material-icons">insert_link</i>
          </div>
          <input 
            type="text"
            name="url"
            className='form-control' 
            placeholder='https://someurl.com'
            onChange={handleChange}
            value={values.url}
          />
        </div>
        <div className="form-group input-group my-1">
          <div className="input-group-text bg-light">
            <i className="material-icons">create</i>
          </div>
          <input 
            type="text"
            name="name"
            className='form-control' 
            placeholder='website name'
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className="form-group mt-1 mb-2">
          <textarea 
            name="description" 
            rows="3" 
            className='form-control'
            placeholder='Write a description'
            onChange={handleChange}
            value={values.description}
          ></textarea>
        </div>
        <button className='btn btn-primary btn-block'>Save</button>
        
      </form>
  )
}

export default LinkForm;