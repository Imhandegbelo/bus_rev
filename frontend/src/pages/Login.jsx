import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";

export default function Login() {
  {
    window.document.title = "DeliChops | Login";
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    shouldRemember: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // if LOGIN was successful or the user is logged in
    // navigate to dashboard
    if (user) {
      navigate("/user/dashboard");
      dispatch(reset());
    }
  }, [message, isError, isSuccess, isLoading, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !/^([a-z0-9_\-.]+)@([a-z0-9_\-.]+)\.([a-z]{2,5})$/i.test(
        formData.email.trim()
      )
    ) {
      setErrors({ ...errors, email: "Invalid email. Please check" });
      toast.error("Invalid email. Please check");
      return;
    }
    setErrors({ ...errors, email: "" });

    if (formData.password === "") {
      setErrors({ ...errors, password: "Please provide a password" });
      toast.error("Please provide a password");
      return;
    } else if (formData.password.length < 8) {
      setErrors({ ...errors, password: "Must be at least 8 characters" });
      toast.error("Must be at least 8 characters");
      return;
    }

    dispatch(login({ email: formData.email, password: formData.password }));
    isError ? toast.error(message) : isSuccess ? toast.success(message) : null;
  };
  return (
    <div>
      <main className="flex justify-center py-20">
        <div className="flex place-center max-w-[1440px]">
          <div className="rounded-[32px] py-10 px-4 border mx-auto w-full max-w-[648px]">
            {/* Green conversation */}
            <Greeting text="Welcome back" />
            {/* Green conversation ends */}
            <h2 className="text-2xl text-center font-semibold">
              Login to continue
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 max-w-[335px]">
              <Input
                type="text"
                name="email"
                placeholder="Enter email address"
                label="Email address"
                value={formData.email}
                error={errors.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
              />

              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                label="Password"
                value={formData.password}
                error={errors.password}
                onChange={(value) =>
                  setFormData({ ...formData, password: value })
                }
              />
              <div className="flex justify-between text-sm">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="Remember me"
                    id="remember"
                    className="accent-white"
                    checked={formData.isChecked}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        isChecked: !formData.isChecked,
                      })
                    }
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <Link
                  to="#"
                  className="text-[#2C742F] font-medium hover:text-[#00B207] hover:scale-110 hover:font-semibold"
                >
                  Forgot password
                </Link>
              </div>
              <button
                type="Submit"
                title="Login"
                className="flex justify-center items-center gap-2.5 group bg-[#00B207] text-white hover:bg-[#00B207]/80 rounded-full py-4 px-8 w-full mt-6 font-semibold"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <span>Login</span>
                    <img
                      src={arrow_right}
                      alt="arrow right"
                      className="group-hover:translate-x-2"
                    />
                  </>
                )}
              </button>
              <p className="mt-4 text-sm text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#00B207] hover:underline"
                >
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
