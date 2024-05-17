"use client"
import React,{useEffect, useState} from 'react'
import {UserAuth} from "../context/AuthContext"
import { userAgentFromString } from 'next/server'
import Todo from '../components/Todo'

const Page = () => {
  const {user} = UserAuth()
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve,50));
      setLoading(false);
    }
    checkAuth();
  }, [user]);
  return (
    <div className='p-4'>
      {loading ? (<p>
        loading...
      </p>) : user ? (
        <p>
          Welcome, {user.displayName} - you are logged in to the profile page
        </p>
      ):
      (<p>Must be logged in to view this page</p>
      )}

      <Todo/>
      
    </div>
  )
}

export default Page