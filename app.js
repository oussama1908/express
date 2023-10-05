const express = require('express');
const app = express();

// Serve Bootstrap CSS files from the node_modules directory
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Set the view engine to Pug
app.set('view engine', 'pug');

// Middleware for time verification
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  // Log information about the current date and time
  console.log(`Day: ${dayOfWeek}, Hour: ${hourOfDay}`);
  console.log('Current Date:', now);
  console.log('UTC Day:', now.getUTCDay() + 1);
  console.log('UTC Month:', now.getUTCMonth() + 1);
  console.log('UTC Year:', now.getUTCFullYear());

  // Check if it's a working day (Monday to Friday) and working hours (9 AM to 6 PM)
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 18) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.render('closed'); // Render the 'closed' Pug template for non-working hours
  }
};

// Use the checkWorkingHours middleware for every request
app.use(checkWorkingHours);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
  res.render('home'); // Render the 'home' Pug template
});

// Route for the services page
app.get('/services', (req, res) => {
  res.render('services'); // Render the 'services' Pug template
});

// Route for the contact page
app.get('/contact', (req, res) => {
  res.render('contact'); // Render the 'contact' Pug template
});

// Set the port for the server
const port = process.env.PORT || 3000;

// Start the server and log the port
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
