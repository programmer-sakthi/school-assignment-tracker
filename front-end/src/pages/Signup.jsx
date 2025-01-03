import React from 'react'



const Signup = () => {

    const handleSignup = () => {    
        // handle the signin ( check if email exists and add it to db )
        
    }


    return (
    <div>
        <form onSubmit={handleSignup}>
          <div>
            <label>Full Name</label>
            <input type="text" />
          </div>
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
          <button type='submit'>SignUp</button>
        </form>
    </div>
  )
}

export default Signup