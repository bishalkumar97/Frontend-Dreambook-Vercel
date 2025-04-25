import Button from '@/components/Button'
import Input from '@/components/Input'
import Password from '@/components/Password'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { isRequired, verifyEmail } from '@/Utilities/helpers'
import Link from 'next/link'
import useFirebaseAuth from '@/services/firebase-services/useFirebaseAuth'
import { loginEmployer, registerEmployer } from '@/services/APIs/onBoarding'
import { setRole, setToken, setUser } from '@/services/firebase-services/cookies'
import { descriptionMessage, errorMessage } from '@/Utilities/toasters'
import SocialFooter from '@/modules/SocialFooter'

export default function Signin() {
  const { loginWithEmailAndPassword, signInWithGoogle } = useFirebaseAuth()
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    if (verifyEmail(formData.get("email")) && isRequired(formData.get("password"), "Password")) {
      const res = await loginWithEmailAndPassword(formData.get("email"), formData.get("password"));
      if (res.status) {
        const response = await loginEmployer(res.token);
        if (response.status) {
          // Add console log to debug role assignment
          console.log('Login Response:', response.data);
          
          // Set user role in cookies
          setRole(response.data.role);
          setToken(res.token);
          setUser(response.data);
          
          // Redirect based on role
          if (response.data.role === 'author') {
            router.push('/dashboard');
          } else if (response.data.role === 'admin') {
            router.push('/dashboard');
          }
        }
      }
    }
    setLoading(false);
  };

  const googleHandler = async () => {
    const res = await signInWithGoogle()
    if (res.status) {
      if (res.isFirstSignIn) {
        const formdataNew = new FormData()
        formdataNew.append("full_name", res.user.displayName)
        formdataNew.append("email", res.user.email)
        const response = await registerEmployer(formdataNew)
        if (response.status) {
          router.push(`/details?step=1&name=${res.user.displayName}&email=${res.user.email}`)
        } else {
          await deleteMyAccount()
          setLoading(false)
        }
      } else {
        const response = await loginEmployer(res.token)
        if (response.status) {
          setUser(response.data)
          setToken(res.token, res.expiryTime)
          setRole(response.data.role)

          const role = response.data.role
          if (role === "admin") {
            router.push("/dashboard")
          } else if (role === "author") {
            router.push("/authors")
          } else if (role === "employee") {
            router.push("/employees")
          } else {
            router.push("/unauthorized")
          }
        } else {
          errorMessage("Google login failed.")
          setLoading(false)
        }
      }
    }
  }

  return (
    <div className='bg-landing w-full min-h-screen h-full flex flex-wrap flex-col items-center justify-between relative'>
      <div className='absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.08)] z-0'></div>
      <span className='w-full h-5'></span>
      <div className='w-full flex justify-center items-center relative z-50'>
        <form onSubmit={handler} className='bg-[#fdfcff] rounded-lg w-full flex flex-wrap justify-center max-w-[668px] p-7'>
          <img src="/images/dream-book-logo.png" alt="Dream Book Logo" />
          <div className="flex flex-wrap mt-10 w-full">
            <label className="w-full text-sm text-inputLabel font-medium mb-1">Email</label>
            <Input type="email" placeholder="Enter email" name={"email"} invalidmessage="Please enter a valid email." />
          </div>
          <div className="flex flex-wrap mt-5 w-full">
            <label className="w-full text-sm font-medium mb-1">Password</label>
            <Password placeholder="Enter password" name={"password"} />
          </div>
          <Button type="submit" variant="primary" className="mt-6" loading={loading}>Login</Button>
          <Link href="/forgot-password" className="w-fit flex justify-center text-grey text-sm font-semibold mt-5 hover:underline">Forgot Password?</Link>
        </form>
      </div>
      <div className='max-w-[800px] w-full z-10'>
        <SocialFooter />
      </div>
    </div>
  )
}
