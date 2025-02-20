async function getPosts() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
  const res = await fetch(`${baseUrl}/api/proxy/posts`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default async function Blog() {
  const posts = await getPosts()
  
  return (
    <div>
      {/* Your blog content here */}
    </div>
  )
}