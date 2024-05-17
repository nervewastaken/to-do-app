"use client"
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs,deleteDoc, doc,updateDoc } from 'firebase/firestore';



export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    };
  
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    setTasks(tasks.filter(task => task.id !== id));
  };

  const markAsCompleted = async (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: 'Completed' };
      } else {
        return task;
      }
    });

    setTasks(updatedTasks);
    // Update status in Firestore
    await updateDoc(doc(db, 'tasks', id), {
      status: 'Completed'
    });
  };

  return (
    <main className="p-4 flex justify-center">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Task Name</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Finish By</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{task.taskName}</td>
              <td className="border px-4 py-2">{task.priority}</td>
              <td className="border px-4 py-2">{task.finishBy}</td>
              <td className="border px-4 py-2">{task.status}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => markAsCompleted(task.id)}>Mark as Completed</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

