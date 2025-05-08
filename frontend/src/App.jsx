import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])
  
  useEffect(() => {
    // 获取学生数据
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('获取学生数据失败:', error))
  }, [])
  
  return (
    <div>
      <h1>学生管理系统</h1>
      <table>
        <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>班级</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>{student.gender}</td>
              <td>{student.age}</td>
              <td>{student.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App