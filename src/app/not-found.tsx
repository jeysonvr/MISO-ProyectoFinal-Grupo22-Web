import Image from 'next/image'

export default function NotFound() {
  return (
    <div>
      <Image
        src="/images/error.jpg"
        alt="404"
        layout='fill'
        objectFit='cover'
      />
      <div className='errorMessage'>
        <h1>404</h1>
        <h2>Page not found</h2>
      </div>
    </div>
  )
}
