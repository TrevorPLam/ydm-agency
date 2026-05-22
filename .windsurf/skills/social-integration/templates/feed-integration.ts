export async function getInstagramFeed(username: string) {
  const response = await fetch(`https://graph.instagram.com/${username}/media?access_token=${process.env.INSTAGRAM_TOKEN}`)
  return response.json()
}

export async function getTwitterFeed(username: string) {
  const response = await fetch(`https://api.twitter.com/2/users/${username}/tweets`, {
    headers: { Authorization: `Bearer ${process.env.TWITTER_TOKEN}` },
  })
  return response.json()
}
