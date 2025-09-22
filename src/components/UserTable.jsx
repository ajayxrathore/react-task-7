import { collection, getDocs } from "firebase/firestore"
import { db } from "../Firebase/firestore"
import {useState, useEffect} from 'react'

function UserTable() {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        const fetchUsers = async() => {
            const snapshot = await getDocs(collection(db,'users'))
            const data = snapshot.docs.map((doc,i)=>({
                id:i+1,
                email:doc.data().email,
                password:doc.data().password,
                signUpTime:doc.data().createdAt.toDate().toLocaleString(),
                ipAddress:doc.data().ipAddress,
            }))
            setUsers(data)
        }
        fetchUsers()
    },[])

  return (
    <>
    <table className="user-table">
        <thead className="user-table-head">
        <tr>
            <th className="user-table-th">Serial No.</th>
            <th className="user-table-th">Email</th>
            <th className="user-table-th">Password</th>
            <th className="user-table-th">Account Created on</th>
            <th className="user-table-th">Ip Addres</th>
        </tr>
        </thead>
        <tbody className="user-table-body">
        {users.map((doc,id)=>(
            <tr key={doc.id || id}>
                <td className="user-table-td">{id+1}</td>
                <td className="user-table-td">{doc.email}</td>
                <td className="user-table-td">{doc.password}</td>
                <td className="user-table-td">{doc.signUpTime}</td>
                <td className="user-table-td">{doc.ipAddress}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </>
  )
}

export default UserTable


