const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// 数据库连接配置
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student_management'
}

// 获取所有学生
app.get('/api/students', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig)
    const [rows] = await connection.query('SELECT * FROM students')
    res.json(rows)
    connection.end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 添加学生
app.post('/api/students', async (req, res) => {
  try {
    const { student_id, name, gender, age, class: className } = req.body
    const connection = await mysql.createConnection(dbConfig)
    const [result] = await connection.query(
      'INSERT INTO students (student_id, name, gender, age, class) VALUES (?, ?, ?, ?, ?)',
      [student_id, name, gender, age, className]
    )
    res.status(201).json({ id: result.insertId })
    connection.end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})