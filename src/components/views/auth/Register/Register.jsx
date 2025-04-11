import RegisterMain from "@/components/views/auth/Register/RegisterMain"

function Register() {
  return (
    <div className="flex flex-col flex-wrap justify-center items-center w-full min-h-[100px] my-5">
      <div className="flex flex-row justify-start items-stretchh-full w-[90%] md:w-[85%] lg:w-[80%]   bg-white">
        <div className="w-[8%] bg-gradient-to-b from-red-500 to-black rounded-l-md"></div>
        <RegisterMain />
        <div className="w-[8%] bg-gradient-to-b from-red-500 to-black rounded-r-md"></div>
      </div>
    </div>
  )
}

export default Register