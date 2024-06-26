import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../../Components/SocialLogin";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const captchaRef = useRef(null);
  // console.log(kola);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handlleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    // console.log(value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <div className="">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="captcha"
                  ref={captchaRef}
                  name="captcha"
                  placeholder="Type the captcha here"
                  className="input w-full input-bordered"
                />
                <button
                  onClick={handlleValidateCaptcha}
                  className="btn w-full btn-outline mt-3 btn-xs"
                >
                  Check Captha
                </button>
              </div>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                disabled={disabled}
                className="btn btn-primary"
              />
            </div>
            <SocialLogin></SocialLogin>
            <p>
              New Here ?{" "}
              <Link
                className="text-blue-700 font-bold hover:underline"
                to="/register"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Helmet>
        <title>Login | Bistro</title>
      </Helmet>
    </div>
  );
};

export default Login;
