import React from 'react'
import LinkForm from './LinkForm'
import { db } from "../firebase";

function Links() {

  const addOrEditLink = async (linkObject) => {
    await db.collection("links").doc().set(linkObject)
    console.log("new link added")
  }

  return (
    <div>
      <LinkForm addOrEditLink={addOrEditLink} />
      <h2>Links</h2>
    </div>
    
  )
}

export default Links;