'use client'
import { useEffect } from "react";
import { useAuthStore } from "./lib/store/useAuthStore";

export default function Home() {

  const {authUser, checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[authUser])
  return (
    <>Homepage</>
    );
}
