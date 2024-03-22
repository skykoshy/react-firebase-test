import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'
const MySwal = withReactContent(Swal);

const Show = () => {
    const auth = useAuth();
    const navigate = useNavigate()
    const {uid} = auth.user
    const [tasks, setTasks] = useState( [] )
    
    const tasksCollection = collection( db ,"tareas")
    
    const getTasks = async () =>{
        const data = await getDocs(tasksCollection)
        setTasks(data.docs.map((doc1) => ({...doc1.data(), id:doc1.id })))
    }

    const deleteTask = async (id) =>{
       const taskDoc = doc(db,"tareas",id)
       await deleteDoc(taskDoc)
       getTasks()
    }

    const confirmDelete = (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            deleteTask(id)
              MySwal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
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
        getTasks()

    },[])
  return (
   <>
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grid gap-2'>
                    {uid && <div className='d-grid gap-2'> <button onClick={()=> handleLogout()} className="btn btn-danger">Logout</button></div> }
                    <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                </div>
                <table className='table table-dark table-hover '>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Fecha de creación</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {tasks.map( (task)=>(
                            <tr key={task.id}>
                                <td>{task.titulo}</td>
                                <td>{task.descripcion}</td>
                                <td>{task.estado}</td>
                                <td>{new Date(task.fecha_creacion.seconds * 1000).toLocaleDateString("en-US")}</td>
                                <td>
                                    <Link to={`/edit/${task.id}`} className='btn btn-light'><i className="fa-solid fa-pen"></i></Link>
                                    &nbsp;
                                    <button onClick={()=>{confirmDelete(task.id)}} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
   </>
  )
}

export default Show
