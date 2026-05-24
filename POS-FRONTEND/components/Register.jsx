import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [availableRoles, setAvailableRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const [form, setForm] = useState({
    name: '',
    username: '',
    phoneNo: '',
    password: '',
    roles: []
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;

    if (form.name.trim().length < 3) {
      nextErrors.name = 'Name must be at least 3 characters';
    } else if (!nameRegex.test(form.name.trim())) {
      nextErrors.name = 'Name should contain only letters';
    }

    if (!emailRegex.test(form.username.trim())) {
      nextErrors.username = 'Enter valid email address';
    }

    if (form.roles.length === 0) {
      nextErrors.roles = 'Select at least one role';
    }

    if (!phoneRegex.test(form.phoneNo.trim())) {
      nextErrors.phoneNo = 'Enter valid 10-digit phone number';
    }

    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const toggleRole = (role) => {
    setForm((current) => {
      const hasRole = current.roles.includes(role);
      return {
        ...current,
        roles: hasRole ? current.roles.filter((r) => r !== role) : [...current.roles, role]
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const normalizeRoleEntry = (role) => {
    if (!role) return null;
    if (typeof role === 'string') return role;
    return role.identifier || role.name || role.role || role.value || role.id || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/register',
        form,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;

      setMessage(data?.message || 'Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      const message = error?.response?.data?.message || 'Registration failed. Please try again.';
      setMessage(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        // Many list endpoints use POST with a pagination body on this backend
        const response = await axios.post(
          'http://localhost:8080/api/role/list',
          { page: 0, sizePerPage: 50, sortDirection: 'ASC', sortField: 'identifier' },
          { headers }
        );

        const data = response.data;

        // Expecting an array of roles or an object wrapper containing list
        let rolesArray = [];
        if (Array.isArray(data)) {
          rolesArray = data;
        } else if (Array.isArray(data?.content)) {
          rolesArray = data.content;
        } else if (Array.isArray(data?.roles)) {
          rolesArray = data.roles;
        } else if (Array.isArray(data?.data)) {
          rolesArray = data.data;
        }

        const normalized = rolesArray
          .map(normalizeRoleEntry)
          .filter((role) => typeof role === 'string' && role.length > 0);

        if (mounted) {
          setAvailableRoles(normalized.length ? normalized : ['Manager', 'Admin', 'Distributor', 'Shopowner']);
        }
      } catch (err) {
        if (mounted) setAvailableRoles(['Manager', 'Admin', 'Distributor', 'Shopowner']);
      } finally {
        if (mounted) setLoadingRoles(false);
      }
    };

    fetchRoles();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="main-container">
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
        min-height: 100%;
        overflow-x: hidden;
        }

        body {
        font-family: 'Poppins', sans-serif;
        background: #eef6f6;
        }

        .main-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .left-panel {
        flex: 1;
        background: linear-gradient(135deg, #cee9e9, #8fcfcd);
        color: #1f3b3b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 60px;
        position: relative;
        overflow: hidden;
        text-align: left;
        }

        .left-panel h1 {
          font-size: 42px;
          font-weight: 700;
          margin: 0;
        }

        .left-panel p {
          font-size: 20px;
          margin-top: 20px;
          line-height: 1.5;
        }

        .login-btn {
          margin-top: 30px;
          display: inline-block;
          padding: 10px 18px;
          background: #4aa6a3;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          width: fit-content;
        }

        .curve {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 120px;
          z-index: 2;
        }

        .curve svg {
          height: 100%;
          width: 100%;
        }

        .right-panel {
        flex: 1;
        background: #f7f7fb;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        }

        .form-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 360px;
          background: white;
          padding: 40px;
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }

        .form-box h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #4aa6a3;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .form-box input[type="text"],
        .form-box input[type="number"],
        .form-box input[type="password"],
        .form-box input[type="email"] {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
          transition: 0.2s;
        }

        .form-box input:focus {
          border-color: #4aa6a3;
        }

        .form-box button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #cee9e9, #4aa6a3);
          box-shadow: 0 12px 30px rgba(74, 166, 163, 0.35);
          transition: all 0.2s ease;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .form-box button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 30px rgba(74, 166, 163, 0.35),
            0 0 15px rgba(74, 166, 163, 0.2);
        }

        .roles-group {
          width: 100%;
          margin-bottom: 12px;
        }

        .roles-label {
          font-size: 12px;
          font-weight: 500;
          color: #aaa;
          margin-bottom: 8px;
          display: block;
          letter-spacing: 0.5px;
        }

        .checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }

        .checkbox-item:hover {
          border-color: #4aa6a3;
          background: #f0fafa;
        }

        .checkbox-item input[type="checkbox"] {
          width: 16px;
          height: 16px;
          min-width: 16px;
          margin: 0;
          padding: 0;
          accent-color: #4aa6a3;
          cursor: pointer;
        }

        .checkbox-item span {
          font-size: 13px;
          color: #444;
          font-weight: 500;
        }

        .checkbox-item.checked {
          border-color: #4aa6a3;
          background: #eaf6f6;
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          min-width: 260px;
          max-width: 80%;
          padding: 14px 18px;
          border-radius: 14px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: rgba(31, 59, 59, 0.9);
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          background-image: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.25),
            rgba(255, 255, 255, 0.08)
          );
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          z-index: 9999;
          opacity: 0;
          animation: toastIn 0.4s ease forwards;
        }

        .toast::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: radial-gradient(
            circle at center,
            rgba(74, 166, 163, 0.25),
            transparent 70%
          );
          z-index: -1;
          filter: blur(12px);
        }

        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .toast.hide {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
          transition: all 0.4s ease;
        }

        small {
          color: red;
        }
      `}</style>

      <div className="left-panel">
        <h1>POS Application</h1>
        <p>Register to continue</p>
        <button className="login-btn" type="button" onClick={() => navigate('/login')}>LOG IN</button>
        <div className="curve">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 H100 V100 H0 C60,80 60,20 0,0 Z" fill="#f7f7fb"></path>
          </svg>
        </div>
      </div>

      <div className="right-panel">
        <div className="form-box">
          <h2>SIGN UP</h2>

          {message && <div className="toast">{message}</div>}

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <small>{errors.name}</small>}

            <input
              name="username"
              type="email"
              placeholder="Email Address"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <small>{errors.username}</small>}

            <div className="roles-group">
              <span className="roles-label">SELECT ROLE(S)</span>
              <div className="checkbox-list">
                {loadingRoles ? (
                  <span className="text-sm text-gray-500">Loading roles...</span>
                ) : availableRoles.length === 0 ? (
                  <span className="text-sm text-red-500">No roles available.</span>
                ) : (
                  availableRoles.map((role) => (
                    <label
                      key={role}
                      className={`checkbox-item ${form.roles.includes(role) ? 'checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        name="roles"
                        value={role}
                        checked={form.roles.includes(role)}
                        onChange={() => toggleRole(role)}
                      />
                      <span>{role}</span>
                    </label>
                  ))
                )}
              </div>
              {errors.roles && <small>{errors.roles}</small>}
            </div>

            <input
              name="phoneNo"
              type="text"
              placeholder="Phone Number"
              value={form.phoneNo}
              onChange={handleChange}
            />
            {errors.phoneNo && <small>{errors.phoneNo}</small>}

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <small>{errors.password}</small>}

            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'SIGN UP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
