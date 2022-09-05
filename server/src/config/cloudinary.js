const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'artish', 
    api_key: '313128648827394', 
    api_secret: 'hw2vtq8oq20A_J48bprIQC_lV9Q' 
  });

module.exports = cloudinary;