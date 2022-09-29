import React from 'react'

function LinkForm() {
  return (
      <form className='card card-body'>

        <div className="form-group input-group my-1">
          <div className="input-group-text bg-light">
            <i className="material-icons">insert_link</i>
          </div>
          <input 
            type="text"
            name="url"
            className='form-control' 
            placeholder='https://someurl.com'
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
          />
        </div>
        <div className="form-group my-1">
          <textarea 
            name="description" 
            rows="3" 
            className='form-control'
            placeholder='Write a description'
          ></textarea>
        </div>
        <button className='btn btn-primary btn-block'>Save</button>
        
      </form>
  )
}

export default LinkForm;