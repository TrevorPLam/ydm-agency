import { Suspense } from 'react'

async function UserList() {
  const users = await fetch('https://api.example.com/users', {
    next: { revalidate: 60 },
  }).then(r => r.json())

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserList />
    </Suspense>
  )
}
