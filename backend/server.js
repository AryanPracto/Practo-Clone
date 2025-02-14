// server.js
require("ignore-styles"); 
require('./babel-register.js');


const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
require('dotenv').config();
const {sequelize} = require('./config/db.js');
const cors = require('cors');
const Doctor=require('./models/doctor.model.js')
const getRoute=require('./routes/getRoute.js');
const insertRoute=require('./routes/insertRoute.js');
const authRoute=require('./routes/authRoute.js');
// Import your components
const Home = require('../frontend/src/pages/Home/Home.jsx').default;
const ListDentist = require('../frontend/src/pages/ListDentist/ListDentist.jsx').default;
const ListCough = require('../frontend/src/pages/ListCough/ListCough.jsx').default;
const Login=require('../frontend/src/pages/Login/Login.jsx').default;
const Signup=require('../frontend/src/pages/Signup/Signup.jsx').default;
const DoctorProfile=require('../frontend/src/pages/DoctorProfile/DoctorProfile.jsx').default;

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API Routes
app.use('/api/v1/get',getRoute)
app.use('/api/v1/insert',insertRoute)
app.use('/api/v1/auth',authRoute)

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

// Render function to generate HTML
const renderPage = (Component, initialData = {}) => {
  const content = ReactDOMServer.renderToString(React.createElement(Component));
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Practo Clone</title>
        <link rel="stylesheet" href="/styles.css">
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        </script>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
};

// Route handlers
app.get('/', (req, res) => {
  res.send(renderPage(Home));
});

app.get('/list-dentist', async (req, res) => {
  try {
    res.send(renderPage(ListDentist));
  } catch (error) {
    console.error('Error:', error);
    res.send(renderPage(ListDentist, { doctors: [], error: 'Failed to fetch doctors' }));
  }
});

app.get('/list-cough', async (req, res) => {
  try {
    res.send(renderPage(ListCough));
  } catch (error) {
    console.error('Error:', error);
    res.send(renderPage(ListCough, { doctors: [], error: 'Failed to fetch doctors' }));
  }
});

app.get('/login',async(req,res)=>{
  try {
    res.send(renderPage(Login))
  } catch (error) {
    console.log(error);
  }
})

app.get('/signup',async(req,res)=>{
  try {
    res.send(renderPage(Signup))
  } catch (error) {
    console.log(error)
  }
})

app.get('/doctor/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doctor = await Doctor.findOne({ where: { id } });

    if (!doctor) {
      console.log('No doctor found for ID:', id); // Add this debug log
      return res.status(404).send('Doctor not found');
    }

    const doctorData = doctor.toJSON();
    // For now, let's just send the JSON data instead of rendering
    res.json(doctorData);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).send('Server error');
  }
});