import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const hideMessage = () => {
    setTimeout(() => setMessage(''), 3500);
  };

  useEffect(() => {
    if (message) {
      hideMessage();
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log(credentials);
      const response = await fetch('http://localhost:8080/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      console.log(response.status);

      const data = await response.json();
      console.log(data);
      const token = data?.token;
      const roles = data?.roles || [];

      if (!response.ok || !token || token === 'Error') {
        setMessage(data?.message || data?.error || 'Invalid username or password');
        setMessageType('error');
      } else {
        localStorage.setItem('token', token);
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('userRoles', JSON.stringify(roles));
        setMessage('Login successful, redirecting...');
        setMessageType('success');
        setTimeout(() => navigate('/dashboard'), 600);
      }
    } catch (err) {
      console.error(err);
      setMessage('Unable to sign in. Please check your connection.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            }

            html,
            body,
            #root {
            width: 100%;
            height: 100%;
            overflow: hidden;
            }

            body {
            margin: 0;
            }
            
        .login-page {
          min-height: 100vh;
          margin: 0;
          padding: 0;
          background: #f7f7fb;
          font-family: 'Poppins', sans-serif;
          color: #1f3b3b;
        }

        .main-container {
          display: flex;
          flex-direction: row-reverse;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .left-panel,
        .right-panel {
          flex: 1;
          min-width: 320px;
        }

        .left-panel {
          background: linear-gradient(135deg, #dbeafe, #93c5fd);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          text-align: right;
          padding: 70px 40px;
          position: relative;
        }

        .left-panel h1 {
          margin: 0;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
        }

        .left-panel p {
          font-size: 1.15rem;
          margin-top: 20px;
          line-height: 1.5;
          max-width: 420px;
        }

        .btn {
          margin-top: 30px;
          display: inline-block;
          padding: 12px 22px;
          background: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .curve {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 100%;
          width: 140px;
          z-index: 5;
          pointer-events: none;
        }

        .curve svg {
          height: 100%;
          width: 100%;
        }

        .right-panel {
          background: #f7f7fb;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }

        .form-box {
          width: min(420px, 100%);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 26px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(255,255,255,0.6);
        }

        .form-box h2 {
          margin: 0 0 24px;
          color: #2563eb;
          font-weight: 700;
          letter-spacing: 1px;
          text-align: center;
        }

        .form-box input {
          width: 100%;
          padding: 14px 16px;
          margin-bottom: 14px;
          border-radius: 14px;
          border: 1px solid #d1d5db;
          outline: none;
          font-size: 1rem;
          color: #0f172a;
        }

        .form-box input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
        }

        .form-box button {
          width: 100%;
          padding: 14px 16px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #93c5fd, #3b82f6);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .form-box button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(37, 99, 235, 0.35);
        }

        .form-box button:disabled {
          opacity: 0.75;
          cursor: not-allowed;
          transform: none;
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          min-width: 260px;
          max-width: 90%;
          padding: 16px 18px;
          border-radius: 16px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: rgba(31, 59, 59, 0.95);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.45);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          z-index: 9999;
          opacity: 1;
          animation: toastUp 0.4s ease;
        }

        .toast.error {
          color: #b91c1c;
          background: rgba(254, 226, 226, 0.95);
          border-color: rgba(248, 113, 113, 0.35);
        }

        .toast.success {
          color: #064e3b;
          background: rgba(220, 252, 231, 0.95);
          border-color: rgba(34, 197, 94, 0.35);
        }

        @keyframes toastUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @media (max-width: 900px) {
          .main-container {
            flex-direction: column;
          }

          .left-panel,
          .right-panel {
            min-height: 50vh;
            width: 100%;
          }

          .left-panel {
            align-items: center;
            text-align: center;
            padding: 50px 24px;
          }

          .curve {
            display: none;
          }
        }
      `}</style>

      <div className="main-container">
        <div className="left-panel">
          <h1>POS Application.</h1>
          <p>Welcome Back</p>
          <a href="/register" className="btn">REGISTER</a>
        </div>

        <div className="curve">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M100,0 H0 V100 H100 C40,80 40,20 100,0 Z" fill="#f7f7fb"></path>
          </svg>
        </div>

        <div className="right-panel">
          <div className="form-box">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Email Address"
                value={credentials.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'LOGIN'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {message && <div className={`toast ${messageType}`}>{message}</div>}
    </div>
  );
};

export default Login;

