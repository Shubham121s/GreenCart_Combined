const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

// Simple in-memory user for demo (in production, use a User model)
const users = [
  {
    id: 1,
    username: "admin@greencart.com", // Updated to match frontend email format
    email: "admin@greencart.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: admin123
    role: "admin",
    name: "Admin User",
  },
]

// POST login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    
    if(username==="admin@greencart.com" && password==="admin123"){
      const token = jwt.sign(
      {
        id: users.id,
        username: users.username,
        email: users.email, // Added email to token
        role: users.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    )
     return res.json({
      token,
      user: {
        id: 1,
        username: "admin@greencart.com",
        email: "admin@greencart.com", // Added email to response
        name: "Admin User", // Added name to response
        role: "admin",
      },
    })

    }else{
      return res.status(401).json({ message: "Invalid username or password" })
    }
   

    // Check password
    const isMatch = await bcrypt.compare(password, users.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Create token
    // const token = jwt.sign(
    //   {
    //     id: users.id,
    //     username: users.username,
    //     email: users.email, // Added email to token
    //     role: users.role,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: process.env.JWT_EXPIRE,
    //   },
    // )

    // res.json({
    //   token,
    //   user: {
    //     id: users.id,
    //     username: users.username,
    //     email: users.email, // Added email to response
    //     name: users.name, // Added name to response
    //     role: users.role,
    //   },
    // })
  } catch (error) {
    console.error("Login error:", error) // Added error logging
    res.status(500).json({ message: error.message })
  }
})

module.exports = router