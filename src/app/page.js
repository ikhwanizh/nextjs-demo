// Home.js
'use client'
// Home.js
import addData from "@/firebase/firestore/addData";
import { useState, useEffect } from 'react';
import { getFirestoreData } from '@/firebase/firestore/getData';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    house: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { result, error } = await getFirestoreData('users', 'user-id');
    if (error) {
      console.log(error);
    } else {
      setUserData(result.data());
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, house } = formData;
    const data = { name, house };

    const { error } = await addData('users', 'user-id', data);
    if (error) {
      console.log(error);
    } else {
      fetchData();
      setFormData({ name: '', house: '' });
      console.log('Data added successfully');
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="house">House:</label>
          <input type="text" id="house" name="house" value={formData.house} onChange={handleInputChange} />
        </div>
        <button type="submit">Add data</button>
      </form>
      {userData && (
        <div>
          <h2>User Data:</h2>
          <p>Name: {userData.name}</p>
          <p>House: {userData.house}</p>
        </div>
      )}
    </div>
  );
}

