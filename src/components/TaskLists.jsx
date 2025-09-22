import {useState, useEffect} from 'react'
import {collection, getDocs} from "firebase/firestore"
import {db} from "../Firebase/firestore"
import emailUid from './emailuid.js'

function TaskLists() {
    const [tasks,setTasks]=useState([])
    useEffect(()=>{
        const fetchLists = async()=>{
            const emailmap = await emailUid()
            const snapshot = await getDocs(collection(db,'lists'))
            const data = snapshot.docs.map((doc,id)=>({
                id:id+1,
                title:doc.data().name,
                createdBy:emailmap[doc.data().owner] ||doc.data().owner,
                taskCount:doc.data().taskCount,
                createdAt:doc.data().createdAt.toDate().toLocaleString(),
                updatedAt:doc.data().updatedAt.toDate().toLocaleString()
            }))
            setTasks(data)
        }
        fetchLists()
    },[])
  return (
   <>
    <table className="user-table">
        <thead className="user-table-head">
        <tr>
            <th className="user-table-th">Serial No.</th>
            <th className="user-table-th">Title</th>
            <th className="user-table-th">Created By</th>
            <th className="user-table-th">Number of tasks</th>
            <th className="user-table-th">Creation Time</th>
            <th className="user-table-th">Last Updated </th>
        </tr>
        </thead>
        <tbody className="user-table-body">
        {tasks.map((doc,id)=>(
            <tr key={doc.id || id}>
                <td className="user-table-td">{id+1}</td>
                <td className="user-table-td">{doc.title}</td>
                <td className="user-table-td">{doc.createdBy}</td>
                <td className="user-table-td">{doc.taskCount}</td>
                <td className="user-table-td">{doc.createdAt}</td>
                <td className="user-table-td">{doc.updatedAt}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </>
  )
}

export default TaskLists
