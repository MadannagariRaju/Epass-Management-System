import React from 'react'
import CreateForm from './CreateForm'
import StudentNav from './StudentNav'
import AllForms from './AllForms'

export default function Student() {
  return (
    <>
    <StudentNav/>
    <div className='container'>
     
      <CreateForm/>
      <AllForms/>
    </div>
    </>
  )
}
