import { useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp.module.css';

export default function Signup() {
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

      setSuccess('Kayıt başarılı!');
      setTimeout(() => {
        navigate('/home'); 
      }, 1500);

    } catch (err) {
      console.error('Kayıt hatası:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.signupContainer}>
        <img
          src="https://cdn.dribbble.com/users/9378043/screenshots/16832559/netflix__1_.png"
          alt="Netflix Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Kayıt Ol</h1>
        <form onSubmit={handleSignUp} className={styles.signupForm}>
          <input
            type="text"
            placeholder="Ad"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.inputField}
            required
          />
          <input
            type="text"
            placeholder="Soyad"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.inputField}
            required
          />
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            className={styles.selectField}
            required
          >
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
            className={styles.inputField}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
          />
          <button type="submit" className={styles.signupButton}>
            Kayıt Ol
          </button>
        </form>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <div className={styles.authButtons}>
          <p>
            Hesabın var mı?{" "}
            <Link to="/login" className={styles.loginLink}>
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
