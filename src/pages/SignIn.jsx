import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Label, Spinner, TextInput } from "flowbite-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSignIn from "../hooks/useSignIn";
import { useEffect } from "react";

const SignIn = () => {
  const { loading , currentUser } = useSelector((state) => state.user);
  const { handleSubmit } = useSignIn();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-800 flex flex-col lg:flex-row flex-1">
        {/* Left Section */}
        <div className="flex-1 p-6 lg:p-12 flex items-center justify-center lg:justify-start">
          <div className="text-center lg:text-left lg:pl-[25%]">
            <Link to="/" className="font-bold dark:text-white text-4xl">
              <span className="rounded-lg text-6xl text-red-300">
                OffSync
              </span>
            </Link>
            <p className="mt-5 text-2xl text-blue-200">
              Web Form with Offline Capabilities
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-6 lg:p-12 flex flex-col justify-center md:px-[10%]">
          <form className="flex flex-col gap-4 lg:pr-[30%]" onSubmit={onSubmit}>
            <div className="flex flex-col">
              <Label value="Email" className="text-white" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pt-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <Label value="Password" className="text-white" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pt-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center">
                  <Spinner />
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
