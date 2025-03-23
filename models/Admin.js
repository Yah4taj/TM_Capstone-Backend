import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User schema
    required: true 
  },
  adminRole: { 
    type: String, 
    enum: ['headAdmin', 'moderator', 'manager'], // Admin roles
    required: true 
  },
  permissions: [{
    type: String, //  permissions for admin
    enum: ['manageUsers', 'viewReports', 'modifyData', 'managemMaterials'],
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
