import React from 'react';
import {Button,Card} from 'react-bootstrap';
import {useAuth} from "../contexts/AuthContext";
import {Link,useHistory} from 'react-router-dom';
import {Alert} from 'react-bootstrap';




function Dashboard(){
    const{logout,currentUser}=useAuth();
    const[Error,setError]=React.useState('');
    const history=useHistory();
    async function handleLogout(){
        setError("")
        try{
            await logout();
            history.push("/login")
        }catch(err){setError("Failed to logout")}
    }
  return(
     <>
      <Card>
          <Card.Body>
              <h2 className="text-center">Profile</h2>
              {Error && <Alert className="text-center" variant="danger">{Error}</Alert>}
              <strong>Email:</strong>{currentUser.email}
              <Link to="/updateaccount" className="w-100 btn btn-primary mt-2">Update profile</Link>
          </Card.Body>

     </Card>
<div className="w-100 text-center mt-4">
    <Button type="link" onClick={handleLogout} className="btn-danger">Log Out</Button>
    
</div>
     </>
  )

 }

export default Dashboard