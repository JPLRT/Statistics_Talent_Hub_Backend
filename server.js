    const express = require('express');
    const connectDB = require('./config/database');
    const cors = require('cors');
    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');
    require('dotenv').config();

    const app = express();

     // Connect to Database
     connectDB();

    // Init middleware
     app.use(express.json({ extended: false }));
     app.use(cors()); // Enable CORS for all routes

    // Define Routes
   app.use('/api/auth', require('./routes/auth'));
    app.use('/api/users', require('./routes/users'));
   app.use('/api/posts', require('./routes/posts'));
     app.use('/api/comments', require('./routes/comments'));


      // Configure Multer for file uploads
   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          const uploadPath = 'uploads/';
        // Check if the uploads directory exists, create if not
           if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
               console.log(`uploads directory created ${uploadPath}`);
            }
           cb(null, uploadPath);
        },
       filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    });
    const upload = multer({ storage: storage });


   app.post('/api/upload', upload.single('image'), (req, res) => {
        if (!req.file) {
         console.log('No file uploaded');
          return res.status(400).json({ msg: 'No file uploaded' });
      }
    console.log('File received by server:', req.file);
    const host = req.get('host');
    const imageUrl = `https://${host}/${req.file.path}`.replace(/\\/g, '/');
      console.log("Generated Image URL:",imageUrl);
      res.json({ imageUrl });
});
   // Make the uploads folder accessible
 app.use('/uploads', express.static('uploads'));
  app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));    const express = require('express');
  const connectDB = require('./config/database');
  const cors = require('cors');
  const multer = require('multer');
  const path = require('path');
  const fs = require('fs');
  require('dotenv').config();

  const app = express();

   // Connect to Database
   connectDB();

  // Init middleware
   app.use(express.json({ extended: false }));
   app.use(cors()); // Enable CORS for all routes

  // Define Routes
 app.use('/api/auth', require('./routes/auth'));
  app.use('/api/users', require('./routes/users'));
 app.use('/api/posts', require('./routes/posts'));
   app.use('/api/comments', require('./routes/comments'));


    // Configure Multer for file uploads
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';
      // Check if the uploads directory exists, create if not
         if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
             console.log(`uploads directory created ${uploadPath}`);
          }
         cb(null, uploadPath);
      },
     filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });


 app.post('/api/upload', upload.single('image'), (req, res) => {
      if (!req.file) {
       console.log('No file uploaded');
        return res.status(400).json({ msg: 'No file uploaded' });
    }
  console.log('File received by server:', req.file);
  const host = req.get('host');
  const imageUrl = `https://${host}/${req.file.path}`.replace(/\\/g, '/');
    console.log("Generated Image URL:",imageUrl);
    res.json({ imageUrl });
});
 // Make the uploads folder accessible
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));