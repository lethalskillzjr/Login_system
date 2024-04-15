import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Signup() {
    // State variables for form fields and error message
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

     // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        try {
             // Check if any field is empty
            if (!name || !email || !password || !confirmPassword) {
                setError('please fill out all fields')
                return;
            }
            
             // Check if password and confirm password match
            if(password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

             // If all validations pass, send POST request to register user
            axios.post('http://localhost:3001/register', { name, email, password })
                .then(result => {
                    console.log(result);
                    navigate("/login");
                    setError(''); // Clear any previous error
                })
                .catch(error => {
                    console.error('Registration failed:', error);
                    setError('Registration failed. Please try again.');
                });
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    }

    // JSX for the signup form
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="name"
                            id="name"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="email"
                            id="email"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            id="password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            placeholder="Confirm password"
                            autoComplete="off"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control rounded-0"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <p className='text-danger'>{error}</p>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Signup;