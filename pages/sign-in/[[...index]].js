import { SignIn } from '@clerk/nextjs'

export default function Page() {

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
      <SignIn />
    </div>

  )
}