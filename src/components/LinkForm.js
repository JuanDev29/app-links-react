import React, { useState, useEffect } from 'react'
import { db } from "../firebase";
import { toast } from 'react-toastify'

function LinkForm(props) {

  const initialStateValues = {
    url: '',
    name: '',
    description: ''
  }

  const [values, setValues] = useState(initialStateValues)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  const validateURL = (str) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(validateURL(values.url)) 
    if(!validateURL(values.url)){
      return toast("Invalid URL", {type: 'warning', autoClose: 1000})
    } else {
      props.addOrEditLink(values)
      setValues({...initialStateValues})
    }
  }

  const getLinkById = async (id) => {
    const link = await db.collection("links").doc(id).get()
    console.log(link.data())
    setValues({...link.data()})
  }

  useEffect(() => {
    if(props.currentId === ''){
      setValues({...initialStateValues})
    } else {
      getLinkById(props.currentId)
    }
  }, [props.currentId])

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
        <button className='btn btn-primary btn-block'>
          {props.currentId === '' ? 'Save' : 'Update'}
        </button>
        
      </form>
  )
}

export default LinkForm;