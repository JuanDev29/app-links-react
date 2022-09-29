import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'
import { db } from "../firebase";
import { toast } from 'react-toastify'

function Links() {

  const [links, setLinks] = useState([])

  const addOrEditLink = async (linkObject) => {
    await db.collection("links").doc().set(linkObject)
    toast("New Link Added", {type: 'success', autoClose: 2000})
  }

  const onDeleteLink = async ({id, name}) => {
    if (window.confirm(`Are you sure you want to delete the link: ${name}?`)) {
      await db.collection("links").doc(id).delete()
      toast("Link Deleted Successfully", {type: 'error', autoClose: 2000})
    }
  }

  const getLinks = () => {
    /*
    const links = await db.collection("links").get()
    links.forEach(doc => {
      console.log(doc.data())
    })
    */
    db.collection('links').onSnapshot((query) => {
      const docs = []
      query.forEach(doc => {
        docs.push({id: doc.id, ...doc.data()})
      })
      setLinks(docs)
    })
  }

  useEffect(() => {
    getLinks();
  }, [])

  return (
    <div>
      <div className="col-md-4 p-2 my-1 mx-auto">
        <LinkForm addOrEditLink={addOrEditLink} />
      </div>
      <h2 className='mt-3 mb-0 text-warning text-center'>Links</h2>
      <div className="col-md-8 p-2 my-1 mx-auto">
        {
          links.map((link, index) => (
            <div key={index} className="card p-2 my-1">
              <div className='card card-body'>
                <div className='d-flex justify-content-between'>
                  <h4>{link.name}</h4>
                  <i
                    className='material-icons text-danger'
                    onClick={() => onDeleteLink(link)}
                  >close</i>
                </div>
                <p>{link.description}</p>
                <a href={link.url} target="_blank" rel="noreferrer">Go to Website</a>
              </div>
            </div>
          ))
        }
      </div>

    </div>
    
  )
}

export default Links;