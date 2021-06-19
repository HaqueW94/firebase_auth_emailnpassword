import React,{useRef} from 'react';
import {Button,Card,Form,Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link} from 'react-router-dom';



function ForgotPassword() {
    const emailRef=useRef();
    const {resetpassword,currentUser}=useAuth();
     const[Error,setError]=React.useState("");
     const[message,setMessage]=React.useState('');
     const[loading,setLoading]=React.useState(false);
    async function handleSubmit(e){
      e.preventDefault();
     
      try{
        setError("");
        setMessage('');
        setLoading(true);
        await resetpassword(emailRef.current.value);
        setMessage('Check your inbox for further instructions');
      }catch(err){
        setError("Failed to reset password");
      }

      setLoading(false);
    }


    return(
        <>
        <Card>
         <Card.Body>
           <h2 className="text-center mb-4">Password Reset</h2>
            {currentUser && currentUser.email}
           {Error && <Alert variant="danger" className="text-center">{Error}</Alert>}
           {message && <Alert variant="success" className="text-center">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
             <Form.Group id="email">
               <Form.Label>Email</Form.Label>
               <Form.Control required ref={emailRef} type="email"/>
             </Form.Group> 

             <Button disabled={loading} className="w-100 mt-3" type="submit">Reset Password</Button>
            </Form>
         </Card.Body>   
        </Card>
        <div className="w-100 text-center mt-3">
          <Link to="/login">Log In</Link>
        </div>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up </Link>
        </div>
        </>
    )

 }

export default ForgotPassword;