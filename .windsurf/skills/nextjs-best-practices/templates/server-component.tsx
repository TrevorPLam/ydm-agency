import { db } from '@/lib/db'

export default async function ServerComponent() {
  const data = await db.query('SELECT * FROM users')

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
