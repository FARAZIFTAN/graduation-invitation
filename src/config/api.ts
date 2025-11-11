const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend.vercel.app/api'  // Update this when you deploy backend
  : 'http://localhost:3000/api';

export default API_BASE_URL;
