import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import api from '../services/api'

const Login = () => {

  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({

    username: '',
    password: ''

  })

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {

    setCredentials({

      ...credentials,

      [e.target.name]: e.target.value

    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError('')

    try {

      const response = await api.post(

        '/api/authenticate',

        credentials
      )

      if (
        response.data.token &&
        response.data.token !== 'Error'
      ) {

        localStorage.setItem(
          'token',
          response.data.token
        )

        localStorage.setItem(
          'username',
          response.data.username
        )

        navigate('/dashboard')

      } else {

        setError('Invalid username or password')
      }

    } catch (err) {

      setError('Login failed')
    }

    finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen flex bg-slate-100">

      {/* LEFT */}

      <div className="flex-1 hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-slate-200 to-slate-50">

        <h1 className="text-6xl font-extrabold text-slate-800 leading-tight mb-5">
          POS MADE SIMPLE
        </h1>

        <p className="text-lg text-slate-600">
          Modern retail management application
        </p>

      </div>

      {/* RIGHT */}

      <div className="w-full lg:w-[460px] flex items-center justify-center p-10">

        <div className="w-full p-10 card-ui border-t-8 border-slate-800">

          <h2 className="page-title text-center mb-8">
            Login
          </h2>

          {
            error && (

              <div className="mb-5 bg-red-100 text-red-600 border border-red-300 p-3 rounded-lg text-center">
                {error}
              </div>
            )
          }

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={credentials.username}
              onChange={handleChange}
              className="input-ui"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              className="input-ui"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full primary-btn text-white py-3 rounded-lg font-semibold"
            >

              {
                loading
                  ? 'Signing In...'
                  : 'Sign In'
              }

            </button>

          </form>

          <div className="text-center mt-6 text-sm text-slate-500">

            Do not have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-slate-800 hover:underline"
            >
              Register here
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login