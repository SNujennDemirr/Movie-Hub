import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/popular');
    } catch (error) {
      setError(error.message);
    }
  };
 const goToSignup = () => {
    navigate('/signup'); 
    
  };

  return (
    <div className="auth-page">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    <div className="auth-buttons">
          <p>
            Hesabın var mı? <button onClick={goToSignup}>giriş yap</button>
          </p>
        </div>
    </div>
    
    
  );
};

export default Login;
