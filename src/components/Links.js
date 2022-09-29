import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'
import { db } from "../firebase";

function Links() {

  const [links, setLinks] = useState([])

  const addOrEditLink = async (linkObject) => {
    await db.collection("links").doc().set(linkObject)
    console.log("new link added")
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
                <h4>{link.name}</h4>
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