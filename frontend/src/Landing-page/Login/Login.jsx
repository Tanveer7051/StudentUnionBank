import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Flash from '../../Flash/Flash.jsx';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [flash, setFlash] = useState({ type: '', message: '' });

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlash({ type: '', message: '' });
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          setFlash({ type: 'error', message: data.message || 'Invalid credentials. Try again!' });
        } catch (e) {
          setFlash({ type: 'error', message: data.message || 'Login failed due to server error.' });
        }
        return;
      }

      const data = await response.json();
      setFlash({ type: 'success', message: 'Login successful!' });
      setIsAuthenticated(true);

      setTimeout(() => navigate('/'), 1500); // Wait to show flash
    } catch (err) {
      console.error(err);
      setFlash({ type: 'error', message: data.message || 'Server error. Please try again later.' });
    }
  };

  return (
    <>
      {flash.message && <Flash type={flash.type} message={flash.message} />}

      <div className="container login_Container d-flex justify-content-center bg-light shadow-lg">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12 col-lg-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12 col-lg-12">
            <label htmlFor="inputPassword4" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center mt-5 col-12">
            <button type="submit" className="btn btn-primary rounded-pill px-5">
              Login
            </button>
            <p className="mt-2">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
