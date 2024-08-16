'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Background from '../(builder)/_components/Background';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GoogleSvg from './_components/GoogleSvg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    console.log(result);
    if (result.ok) {
      // router.push('/');
    } else if (result?.error) {
      setError('Invalid Email/password');
    }
  };

  const signInwithGoogle = () => {
    const result = signIn('google');
    console.log(result);
    router.push('/');
  };

  return (
    <div>
      <Background>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md p-md bg-primary shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-md text-center">
              Login on PageSta
            </h2>
            {error && <p className="text-red-500 text-center mb-md">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-md">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-xs block w-full px-md py-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-xs block w-full px-md py-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                />
              </div>
              <Button
                className="w-full py-md px-lg bg-secondary border text-white 
                                        font-semibold rounded-md 
                                        shadow-sm hover:bg-hover focus:outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-2"
              >
                Login
              </Button>
              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?
                <Link
                  href={'/CreateAccount'}
                  className="text-secondary hover:text-secondary font-medium ml-1"
                >
                  Sign up
                </Link>
              </p>
            </form>
            <div className="mt-lg text-center">
              <h3 className="text-gray-500">OR</h3>
            </div>
            <div className="mt-md">
              <Button
                onClick={signInwithGoogle}
                className="w-full py-md px-lg bg-white 
                                    border border-gray-300 rounded-md shadow-sm 
                                        hover:bg-gray-50 focus:outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-2 flex items-center justify-center 
                                        text-black-400"
              >
                <GoogleSvg />
                <span>Sign in with Google</span>
              </Button>
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
}

export default Login;
