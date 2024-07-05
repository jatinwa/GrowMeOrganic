import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserForm()  {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userDetails = { name, phone, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    navigate('/second');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 max-w-sm mx-auto">
      <TextField 
        label="Name" 
        variant="outlined" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <TextField 
        label="Phone Number" 
        variant="outlined" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        required 
      />
      <TextField 
        label="Email" 
        variant="outlined" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default UserForm;
