import React,{useRef} from 'react';
import {Button,Card,Form,Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link,useHistory} from 'react-router-dom';



function Login() {
    const emailRef=useRef();
    const passwordRef=useRef();
    const {login,currentUser}=useAuth();
     const[Error,setError]=React.useState("");
     const[loading,setLoading]=React.useState(false);
     const history=useHistory();
    async function handleSubmit(e){
      e.preventDefault();
     
      try{
        setError("");
        setLoading(true);
        await login(emailRef.current.value,passwordRef.current.value);
         history.push('/');
      }catch(err){
        setLoading(false);
        setError("Failed to login");
      }
    }


    return(
        <>
        <Card>
         <Card.Body>
           <h2 className="text-center mb-4">Log In</h2>
            {currentUser && currentUser.email}
           {Error && <Alert variant="danger">{Error}</Alert>}
            <Form onSubmit={handleSubmit}>
             <Form.Group id="email">
               <Form.Label>Email</Form.Label>
               <Form.Control required ref={emailRef} type="email"/>
             </Form.Group> 

             <Form.Group id="password">
               <Form.Label>Password</Form.Label>
               <Form.Control required ref={passwordRef} type="password"/>
             </Form.Group>
            
               

             <Button disabled={loading} className="w-100 mt-3" type="submit">Log In</Button>
            </Form>
         </Card.Body>   
        </Card>
        <div className="w-100 text-center mt-3">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up </Link>
        </div>
        </>
    )

 }

export default Login