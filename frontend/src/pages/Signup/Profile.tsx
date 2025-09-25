// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch profile data from backend
    axios.get('http://localhost:3000/user/home', {withCredentials: true}) // Update with your backend URL
      .then(response => {
        setProfile(response.data);  // Assuming the API returns profile object
        setLoading(false);
      })
      .catch(error => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // Redirect to login if not authorized
          navigate('/login');
        } else {
          console.error('Error fetching profile:', error);
          setError('Failed to load profile.');
        }
      });
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {profile}
    </div>
  );
};

export default TestPage;
