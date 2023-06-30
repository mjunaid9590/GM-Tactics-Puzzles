// pages/login.js
"use client"
import { useEffect, useState, useRef } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// import { SignIn } from 'next-auth/client';

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // console.log("Search Params: ", searchParams.get("signup"))
    // console.log(router);
    // console.log("Router Query: ", router.query);
    const [afterSignup, setAfterSignup] = useState(false);

    useEffect(() => {

        if (searchParams.get("signup") == "true") {
            setAfterSignup(true);
        }
        else {
            setAfterSignup(false);
        }
    }, [searchParams.get("signup")]);
    const [isError, setIsError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('Invalid email/password, please try again')
    useEffect(() => {

        if (searchParams.get("error")) {
            setIsError(true);
        }
        else {
            setIsError(false);
        }
    }, [searchParams.get("error")]);

    const emailRef = useRef('');
    const passwordRef = useRef('');



    const onSubmit = async () => {
        try {
            const result = await signIn("credentials", {
                username: emailRef.current,
                password: passwordRef.current,
                redirect: true,
                callbackUrl: "http://localhost:3000/",
            });
            setIsError(false);
        }
        catch (error) {
            setIsError(true);
            return
        }
    };




    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
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
                        {afterSignup &&
                            <div className="p-3 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <span className="font-medium">Signup Successful!</span> Use your email and password to login.
                            </div>
                        }
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                            </div>
                            <div className="mt-8 space-y-6" >
                                <input type="hidden" name="remember" value="true" />
                                <div className="rounded-md shadow-sm ">
                                    {isError &&
                                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                            <span className="font-medium">Login Failed!</span> {errorDescription}.
                                        </div>
                                    }

                                    <div>
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
                                            onChange={(e) => (emailRef.current = e.target.value)} />
                                    </div>
                                    <div className='mt-4'>
                                        <label htmlFor="password" className="sr-only">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Password"
                                            onChange={(e) => (passwordRef.current = e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
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
                                    {/* <Link to="/signup"> */}
                                        <div className="text-sm">
                                            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Register New Account
                                            </Link>
                                        </div>
                                    {/* </Link> */}
                                </div>

                                <div>
                                    <button
                                        onClick={onSubmit}
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
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
