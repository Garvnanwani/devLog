import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserContext } from '@lib/context'
import { auth } from '@lib/firebase'
import Image from 'next/image'

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext)

  const router = useRouter()

  const signOut = () => {
    auth.signOut()
    router.reload()
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Dev Log</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image
                  src={user?.photoURL ? user.photoURL : '/authProfile.jpeg'}
                  alt="image"
                  height={40}
                  width={40}
                />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/login">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
