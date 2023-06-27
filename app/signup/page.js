// pages/login.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

//import bcrypt from 'bcrypt';

export default function Signup() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [passwordEqual, setPasswordEqual] = useState(true);
    const [allFilled, setAllFilled] = useState(true);
    const [signupError, setSignupError] = useState(false);

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if((fullName == '')||(email =='')||(newPassword=='')){
            setAllFilled(false);
            return;
        }
        if(newPassword != verifyPassword){
            setPasswordEqual(false);
            return;
        }
        else{
            setPasswordEqual(true);
        }
        const response = await fetch('/api/signup', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fullName, email, newPassword }),
        });

        if (response.ok) {
            //handle signup
            console.log('SignUp Successful');
            setSignupError(false);
            router.push('/login?signup=true');
        }
        else {
            //Handle Error
            console.error('signup failed');
            setSignupError(true);
        }
    }


    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 pt-12 pb-36 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">
                            Slow-carb next level shoindcgoitch ethical authentic, poko scenester
                        </h1>
                        <p className="leading-relaxed mt-4">
                            Poke slow-carb mixtape knausgaard, typewriter street art gentrify
                            hammock starladder roathse. Craies vegan tousled etsy austin.
                        </p>
                    </div>
                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <div className="max-w-md w-full">
                            <div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
                            </div>
                            <form className="mt-8 " onSubmit={handleSubmit}>
                                <input type="hidden" name="remember" value="true" />
                                <div className="rounded-md shadow-sm">
                                    <div className='my-2'>
                                        <label htmlFor="fullName" className="sr-only">
                                            Full Name
                                        </label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor="email-address" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor="newPassword" className="sr-only">
                                            Password
                                        </label>
                                        <input
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Password"
                                            value={newPassword}
                                            onChange={(e) => setnewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor="verifyPassword" className="sr-only">
                                            Verify Password
                                        </label>
                                        <input
                                            id="verifyPassword"
                                            name="verifyPassword"
                                            type="password"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Verify Password"
                                            value={verifyPassword}
                                            onChange={(e) => {
                                                setVerifyPassword(e.target.value);
                                            }}
                                        />
                                    </div >
                                    <div>
                                        {
                                            !passwordEqual && 
                                        <p className='text-red-500'>
                                            Passwords don't match
                                        </p>
                                        }
                                    </div>
                                    
                                </div>

                                <div className="my-3 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember_me"
                                            name="remember_me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <svg
                                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.97 10a7.98 7.98 0 0114.06-5.66l-1.5 1.5A6.96 6.96 0 004.45 10H10v1H4.45a6.96 6.96 0 009.08 3.16l1.5 1.5A7.98 7.98 0 012.97 10zm7.98 5.66l1.5-1.5A6.96 6.96 0 0015.55 10H10v1h5.55a6.96 6.96 0 00-9.08 3.16l-1.5-1.5A7.98 7.98 0 0117.03 10h-1.5a6.48 6.48 0 01-9.19 3.34L3.93 13.9A8.48 8.48 0 0010.45 10h4.08l1.58-1.59A6.48 6.48 0 0115.53 6.66L13.95 5.07A8.48 8.48 0 0010.45 10h-1.5a6.48 6.48 0 019.19-3.34l1.58-1.59A8.48 8.48 0 0010.45 0h-4.08l-1.58 1.59A6.48 6.48 0 014.47 6.34L6.05 7.93A8.48 8.48 0 0010.45 10h1.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}
