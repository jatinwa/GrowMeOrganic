'use client'

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DepartmentList from './DepartmentList';
import PostTable from './PostTable';

function SecondPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/');
      alert('You must enter your details before accessing this page.');
    }
  }, [navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Second Page</h1>
      <PostTable />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
