/* eslint-disable @next/next/no-img-element */
import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Profiles = () => {
  const router = useRouter()
  const { data: user } = useCurrentUser()
  
  return (
    <div className="flex items-center h-full -z-20 justify-center bg-gray-900 md:bg-gradient-to-t md:from-black">
      <span className="absolute invisible md:visible md:w-640 md:h-640 -z-0 rounded-full top-0 right-10 blur-5xl bg-primary-700 bg-gradient-to-tr from-gray-900 opacity-40"></span>
      <span className="absolute invisible md:visible md:w-640 md:h-640 -z-0 rounded-full bottom-0 left-0 blur-5xl bg-primary-700 bg-gradient-to-bl from-gray-900 opacity-40"></span>
      <div className="flex flex-col w-full xl:ml-96 md:ml-40 sm:ml-20 cell:ml-6">
      <h1 className="text-3xl text-white text-left">Quem está assistindo?</h1>
        <div className="flex items-center z-10 gap-8 mt-10">
          <div onClick={() => router.push('/')}>
            <div className="group flex-row w-44 mx-auto">
              <div className="
                w-44
                h-44
                rounded-md
                flex
                items-center
                justify-center
                border-4
                border-transparent
                group-hover:cursor-pointer
                group-hover:border-primary-500
                transition
                duration-300
                overflow-hidden
              ">
                <img src="/images/miles.jpg" alt="Perfil" />
              </div>

              <div className="
                mt-4
                text-gray-400
                text-2xl
                text-center
                group:hover:text-white
              ">
                Jean{/* {user?.name} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profiles