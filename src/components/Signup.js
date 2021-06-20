import React,{useRef} from 'react';
import {Button,Card,Form,Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link,useHistory} from 'react-router-dom'


function Signup(){
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const {signup,currentUser}=useAuth();
     const[Error,setError]=React.useState("");
     const[loading,setLoading]=React.useState(false);
     const history=useHistory();
    async function handleSubmit(e){
      e.preventDefault();
      if(passwordRef.current.value!==passwordConfirmRef.current.value){
        return setError('password donot match')
      }
      try{
        setError("");
        setLoading(true);
        await signup(emailRef.current.value,passwordRef.current.value);
        history.push('/');
      }catch(err){
        setLoading(false);
        setError("Failed to create account");
      }
    }


    return(
        <>
        <Card>
         <Card.Body>
           <h2 className="text-center mb-4">Sign Up</h2>
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

             <Form.Group id="password-confirm">
               <Form.Label>Password Confirmation</Form.Label>
               <Form.Control required ref={passwordConfirmRef} type="password"/>
             </Form.Group>  

             <Button disabled={loading} className="w-100 mt-3" type="submit">Sign Up</Button>
            </Form>
         </Card.Body>   
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login" >Log In</Link>
        </div>
        </>
    )
}

export default Signup;