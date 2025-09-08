import React, { useState } from 'react';
import { auth, firestore } from '../firebase/firebase'; 
import { useNavigate } from 'react-router-dom';
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
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await firestore.collection('users').doc(user.uid).set({
        firstName,
        lastName,
        gender,
        email,
      });

      setSuccess('Kayıt başarılı!');
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
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Soyad"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <select onChange={(e) => setGender(e.target.value)} required>
            <option value="">Cinsiyet Seçin</option>
            <option value="erkek">Erkek</option>
            <option value="kadın">Kadın</option>
            <option value="diğer">Diğer</option>
          </select>
          <input
            type="email"
            placeholder="E-posta"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Kayıt Ol</button>
        </form>

        {error && <p className="error-message">{error}</p>} 
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

export default Signup; // Bileşeni dışa aktar
