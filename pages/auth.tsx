import axios from 'axios';
import Image from 'next/image'
import Input from '@/components/Input';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant => currentVariant === 'login' ? 'register' : 'login'))
  }, [])

  const login = useCallback(async() => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      })
    } catch (error) {
      console.log(error)
    }
   }, [email, password])

   const register = useCallback(async() => {
     try {
     await axios.post('/api/register', {
         email,
         name,
         password
       })

       login()
     } catch (error) {
       console.log(error)
     }
   }, [email, name, password, login])

  return (
    <div className=" relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50}/>
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-3xl w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Iniciar sessão' : 'Criar conta'}
            </h2>
            <div className='flex flex-col gap-3'>
              {variant === 'register' && (
                <Input
                  label='Usuário'
                  onChange={(ev: any) => setName(ev.target.value)}
                  id='name'
                  value={name}
                />
              )}
              <Input
                label='E-mail'
                onChange={(ev: any) => setEmail(ev.target.value)}
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Senha'
                onChange={(ev: any) => setPassword(ev.target.value)}
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button onClick={variant === 'login' ? login : register} className='bg-primary-500 py-3 text-white rounded-lg w-full mt-10 hover:bg-primary-700 transition'>
              {variant === 'login' ? 'Login' : 'Registrar'}
            </button>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login' ? 'Primeira vez?' : 'Já possui conta?'}
              <span onClick={toggleVariant} className='text-white ml-2 hover:underline cursor-pointer'>
                {variant === 'login' ? 'Criar conta' : 'Login'}
              </span>
            </p>
            <div className='flex text-white items-center mt-6 justify-center'>
              <span className='w-32 h-px mr-4 bg-white'></span>
              <p>Ou</p>
              <span className='w-32 h-px ml-4 bg-white'></span>
            </div>
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                <div 
                  onClick={() => signIn('google', { callbackUrl: '/profiles'})}
                  className='
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-80
                    hover:w-20
                    transition-all
                    duration-300
                    ease-in-out
                '>
                  <FcGoogle size={30} />
                </div>
                <div 
                  onClick={() => signIn('github', { callbackUrl: '/profiles'})}
                  className='
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-80
                    hover:w-20
                    transition-all
                    duration-300
                    ease-in-out
                '>
                  <FaGithub size={30} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;