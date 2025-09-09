import React, { useState } from 'react';
import { auth, db } from '../firebase/firebase'; 
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import '../styles/App.css'; 

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); 

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        gender,
        email,
      });

      setSuccess('basarıli');
      setTimeout(() => {
        navigate('/home'); 
      }, 1500);
    } catch (error) {
      console.error('Kayıt hatası:', error.message);
      setError(error.message); 
    }
  };

  const goToLogin = () => {
    navigate('/login'); 
    
  };

  return (
    <div className="auth-page"> 
      <div className="signup-container">
        <img
          src="https://cdn.dribbble.com/users/9378043/screenshots/16832559/netflix__1_.png"
          alt="Netflix Logo"
          className="logo"
        />
        <h1>Kayıt Ol</h1>
        <form onSubmit={handleSignUp} className="signup-form">
          <input
            type="text"
            placeholder="Ad"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Soyad"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Cinsiyet Seçin</option>
            <option value="erkek">Erkek</option>
            <option value="kadın">Kadın</option>
            <option value="diğer">Diğer</option>
          </select>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Kayıt Ol</button>
        </form>

        {error && <p className=" .. !! ">{error}</p>} 
        {success && <p className="success-message">{success}</p>}

        <div className="auth-buttons">
          <p>
            Hesabın var mı? <button onClick={goToLogin}>Giriş Yap</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
