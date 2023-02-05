import { useEffect, useState } from 'react';

const useAuth = () => {
  const [id, setID] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8800/auth', {
      method:'GET',
      headers: {
        'Content-Type':'application/json'
      },
      credentials: 'include'
    }).then(res => res.json())
      .then(response => {
        if( response.auth === true ) {
          setID(response.user.id);
          setRole(response.user.role);
        } 
      })
  },[]);

  return [id, role];
};

export default useAuth;