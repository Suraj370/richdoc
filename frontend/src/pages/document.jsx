import React from 'react'
import Editor from '../components/Editor'
import { useParams } from 'react-router-dom'

const Document = (props) => {
  let {id} = useParams()
  
  return (
  <div>
    documentId : {id}
  </div>
  )
}

export default Document