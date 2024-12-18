import { useState } from "react";
import Input from "../components/Input";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  function handleSubmit() {
    
  }

  return (
    <main className="flex flex-col md:flex-row">
      <div className="font-poppins md:w-5/12 bg-sky-500 flex justify-center items-center h-[30vh] md:h-[92vh]">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="md:mb-20 mt-4 w-10/12 mx-auto">
            To book a reservation Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dignissimos, iste iure? Aut, voluptate. Dolorum,
            aut ea laborum neque nam corporis.
          </p>
          <Link
            to="/login"
            className="text-lg hidden md:block w-3/5 mx-auto py-3 border border-white rounded-l-full rounded-r-full hover:bg-white hover:text-sky-500 font-bold"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="md:w-7/12 flex justify-center pt-16 md:pt-0 md:items-center relative">
        <div className="w-11/12 md:w-3/5 text-center">
          <h1 className="font-bold text-4xl text-sky-500 tracking-[2px]">
            Login
          </h1>
          <p className="text-sky-900 mb-10">Login to start setting goals</p>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <Input type="text" value={formData.name} label="Full name" placeholder="John Doe" />
            </div>
            <div className="my-3">
              <input
                title="Email"
                type="email"
                autoComplete="false"
                className="w-full bg-sky-50 py-2 px-4 text-xl"
                value={formData.email}
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <input
                title="Password"
                type="password"
                autoComplete="false"
                className="w-full bg-sky-50 py-2 px-4 text-xl"
                value={password}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>

            <div className="mt-10 py-3">
              <button className="flex gap-4 mx-auto items-center text-lg text-white py-3 px-20 bg-sky-500 border border-white rounded-l-full rounded-r-full hover:bg-sky-400 font-bold">
                {/* <FaUser /> */}
                {isLoading ? (
                  <div className="bg-white rounded-full h-10 w-10">
                    <div className="border-b border-sky-400 animate-spin h-full w-full"></div>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
