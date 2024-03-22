import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, updateDoc, Timestamp, getDoc  } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { Link } from 'react-router-dom';


import { useAuth } from "../context/AuthContext";
const Edit = () => {
    const auth = useAuth();
    const {uid} = auth.user
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('Pendiente')
    const [fecha_creacion] = useState(Timestamp.fromDate(new Date()))
    const navigate = useNavigate()
    const {id} = useParams()
    
    const update = async (e) => {
        e.preventDefault()
        const task = doc(db,'tareas', id)
        const data = {titulo:titulo,descripcion:descripcion,estado:estado,fecha_creacion:fecha_creacion}
        await updateDoc(task,data)
        navigate('/')
    }

    const getProductById = async (id) => {
       const task =  await getDoc(doc(db,'tareas',id))
       if (task.exists()) {
            setEstado(task.data().estado)
            setDescripcion(task.data().descripcion)
            setTitulo(task.data().titulo)
       } else {
            navigate('/')
       }
    }
    const handleLogout = () => {
        auth.logout();
        navigate('/')
    }

    const validateUser = () => {
        if(!uid)
        {
            navigate('/')
        }
    }
    
    useEffect( ()=>{
        validateUser()
        getProductById(id)

    },[])


  return (
    <div className='container'>
    <div className='row'>
        <div className='col'>
            <h1>Edit Task</h1>
            {uid && <div className='d-grid gap-2'> <button onClick={()=> handleLogout()} className="btn btn-danger mt-2 mb-2">Logout</button></div> }
                    <Link to="/show" className='btn btn-secondary mt-2 mb-2'>Show task</Link>
            <form onSubmit={update} >
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
                <button className='btn btn-primary' type='submit'>Update</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default Edit
