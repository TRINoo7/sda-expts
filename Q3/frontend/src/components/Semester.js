import React from 'react'
import { Link } from 'react-router-dom'

export default function Semester() {
  return (<>
    <h2>Semester</h2>
    <div>
        <ol>
            <li><Link to='/q3/semester/sem1'>Semester1</Link></li>
            <li><Link to='/q3/semester/sem2'>Semester2</Link></li>
            <li><Link to='/q3/semester/sem3'>Semester3</Link></li>
            <li><Link to='/q3/semester/sem4'>Semester4</Link></li>
            <li><Link to='/q3/semester/sem5'>Semester5</Link></li>
            <li><Link to='/q3/semester/sem6'>Semester6</Link></li>
            <li><Link to='/q3/semester/sem7'>Semester7</Link></li>
            <li><Link to='/q3/semester/sem8'>Semester8</Link></li>
        </ol>
    </div>
    </>
  )
}
