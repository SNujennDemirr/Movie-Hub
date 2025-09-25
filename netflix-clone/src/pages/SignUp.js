"use client";

import { useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../styles/App.css';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

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
        router.push('/homepage'); // yönlendirme Next.js uyumlu
      }, 1500);

    } catch (err) {
      console.error('Kayıt hatası:', err.message);
      setError(err.message);
    }
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

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <div className="auth-buttons">
          <p>
            Hesabın var mı?{" "}
            <Link href="/login" className="text-blue-600 underline hover:text-blue-800">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
