
import React,{useRef} from 'react';
import {Button,Card,Form,Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link,useHistory} from 'react-router-dom'


function UpdateAccount(){
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const {currentUser,emailUpdate,passwordUpdate}=useAuth();
     const[Error,setError]=React.useState("");
     const[loading,setLoading]=React.useState(false);
     const history=useHistory();
    async function handleSubmit(e){
      e.preventDefault();
      if(passwordRef.current.value!==passwordConfirmRef.current.value){
        return setError('password donot match')
      }
      const promises=[];
      setLoading(true);
      setError('');
      if(emailRef.current.value!==currentUser.email){
          promises.push(emailUpdate(emailRef.current.value));
      }

      if(passwordRef.current.value!==currentUser.password){
          promises.push(passwordUpdate(passwordRef.current.value));
      }
      Promise.all(promises).then(()=>{history.push('/')})
      .catch(()=>{setError("Unable update password")})
      .finally(()=>{setLoading(false)})

    }


    return(
        <>
        <Card>
         <Card.Body>
           <h2 className="text-center mb-4">Update Account</h2>
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

             <Button disabled={loading} className="w-100 mt-3" type="submit">Update Account</Button>
            </Form>
         </Card.Body>   
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login" >Cancel</Link>
        </div>
        </>
    )
}





export default UpdateAccount;