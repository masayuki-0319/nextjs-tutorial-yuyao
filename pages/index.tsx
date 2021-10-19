import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          サインインしてください。 <br />
          <button onClick={() => signIn('google')}>Sign in</button>
        </>
      )}
      {session && (
        <>
          サインイン完了。 email: {session!.user!.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
