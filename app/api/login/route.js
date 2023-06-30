import { signIn } from 'next-auth/react';

export async function POST(request) {
    const { email, password } = request.body;
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      res.status(401).json({ message: 'Login failed' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  
}
