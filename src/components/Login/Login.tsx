import bgImg from '../../assets/init-bg.webp'
import SigninForm from '../forms/SigninForm/SigninForm'

function Login() {
  return (
    <>
      <div
        className="hidden lg:block h-full w-full max-w-1/2 bg-center rounded-[20px] bg-secondary-bg"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '80%',
        }}
      />
      <div className="w-full h-full">
        <SigninForm />
      </div>
    </>
  )
}

export default Login
