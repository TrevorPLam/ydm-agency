'use client'

export function SocialShare({ url, title }: { url: string; title: string }) {
  const shareUrl = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }
    window.open(urls[platform as keyof typeof urls], '_blank')
  }

  return (
    <div>
      <button onClick={() => shareUrl('twitter')}>Share on Twitter</button>
      <button onClick={() => shareUrl('facebook')}>Share on Facebook</button>
      <button onClick={() => shareUrl('linkedin')}>Share on LinkedIn</button>
    </div>
  )
}
