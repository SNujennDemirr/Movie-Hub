import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Giriş Yap</h2>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <input
            type="email"
            placeholder="Email"
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
          <button type="submit" className={styles.loginButton}>
            Giriş Yap
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>

        <div className={styles.authButtons}>
          <p>
            Hesabın yok mu?{" "}
            <Link to="/signup" className={styles.signupLink}>
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
