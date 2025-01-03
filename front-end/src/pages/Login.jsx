import React from 'react'



const Login = () => {

    const handleLogin = () => {    
        // handle the login
        
    }


    return (
    <div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input type="email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" />
          </div>
          <input type='radio' id='teacher' name="usertype"/>
          <label htmlFor='teacher'>Teacher</label>
          <input type='radio' id='student' name="usertype"/>
          <label htmlFor='student'>Student</label>
          <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login