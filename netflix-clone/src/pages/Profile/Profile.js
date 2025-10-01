/// Profile.js
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase/firebase';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; 
      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data()); 
        }
      }
      setLoading(false); 
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Yükleniyor...</p> // loading  gösterimi  eklenebilir...
        
      ) : userData ? (
        <div>
          <h2>Profil Bilgileri</h2>
          <p>Ad: {userData.firstName}</p>
          <p>Soyad: {userData.lastName}</p>
          <p>Cinsiyet: {userData.gender}</p>
          <p>E-posta: {userData.email}</p>
        </div>
      ) : (
        <p>Kullanıcı bilgileri bulunamadı.</p> 
      )}
    </div>
  );
};

export default Profile;
