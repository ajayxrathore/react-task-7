import { useState, useEffect } from "react";
import { collection,collectionGroup ,getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/firestore";
import emailUid from "./emailuid.js";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  
useEffect(() => {
  const fetchTasks = async () => {
    const emailmap = await emailUid();


    const listSnap = await getDocs(collection(db, "lists"));
    const listMap = {};
    listSnap.forEach((doc) => {
      listMap[doc.id] = doc.data();
    });


    const tasksSnap = await getDocs(collectionGroup(db, "tasks"));

    const data = tasksSnap.docs.map((taskDoc) => {
      const taskData = taskDoc.data();
      const listData = listMap[taskData.listId] || {};
      return {
        id: taskDoc.id,
        title: taskData.title,
        description: taskData.description,
        listTitle: listData.name || "Unknown",
        createdBy: emailmap[listData.owner] || listData.owner || "Unknown",
        createdAt: taskData.createdAt.toDate().toLocaleString(),
      };
    });

    setTasks(data);
  };

  fetchTasks();
}, []);

  return (
    <>
      <table className="user-table">
        <thead className="user-table-head">
          <tr>
            <th className="user-table-th">Serial No.</th>
            <th className="user-table-th">Title</th>
            <th className="user-table-th">Description</th>
            <th className="user-table-th">List Title</th>
            <th className="user-table-th">Created By</th>
            <th className="user-table-th">Created At </th>
          </tr>
        </thead>
        <tbody className="user-table-body">
          {tasks.map((doc, id) => (
            <tr key={doc.id || id}>
              <td className="user-table-td">{id + 1}</td>
              <td className="user-table-td">{doc.title}</td>
              <td className="user-table-td">{doc.description}</td>
              <td className="user-table-td">{doc.listTitle}</td>
              <td className="user-table-td">{doc.createdBy}</td>
              <td className="user-table-td">{doc.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Tasks;
