import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

import { collection, addDoc, Timestamp  } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { useAuth } from "../context/AuthContext";


const Create = () => {
    const auth = useAuth();
    const {uid} = auth.user

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('Pendiente')
    const [fecha_creacion] = useState(Timestamp.fromDate(new Date()))
    const navigate = useNavigate()
    const tasksCollection = collection(db,'tareas')

    const store = async (e) => {
        e.preventDefault()
        await addDoc(tasksCollection,{descripcion:descripcion, estado:estado, fecha_creacion:fecha_creacion, titulo:titulo })
        navigate('/show')
    }

    const validateUser = () => {
        if(!uid)
        {
            navigate('/')
        }
    }
    const handleLogout = () => {
        auth.logout();
        navigate('/')
    }


    useEffect( ()=>{
        validateUser()
    },[])



  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Create Task</h1>
                {uid && <div className='d-grid gap-2'> <button onClick={()=> handleLogout()} className="btn btn-danger mt-2 mb-2">Logout</button></div> }
                    <Link to="/show" className='btn btn-secondary mt-2 mb-2'>Show task</Link>
                <form onSubmit={store} >
                    <div className='mb-3'>
                        <label className='form-label'>Título</label>
                        <input 
                            value={titulo}
                            onChange={(e) =>setTitulo(e.target.value)}
                            type='text'
                            className='form-control'
                        >
                        </input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Descripción</label>
                        <input 
                            value={descripcion}
                            onChange={(e) =>setDescripcion(e.target.value)}
                            type='text'
                            className='form-control'
                        >
                        </input>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Estado</label>
                        <input 
                            value={estado}
                            onChange={(e) =>setEstado(e.target.value)}
                            type='text'
                            className='form-control'
                        >
                        </input>
                    </div>
                    <button className='btn btn-primary' type='submit'>Store</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create
