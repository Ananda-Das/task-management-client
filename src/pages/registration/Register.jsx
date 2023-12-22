import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
// import PageTitle from "../../components/PageTitle";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    console.log(name, photo, email, password);

    // reset error and success
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      toast.error("password shou");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Your password should have at least one upper case characters.");
      toast.error("adsf");
      return;
    } else if (!/[@#$%^&+*!=]/.test(password)) {
      setRegisterError("Your Password must contain One Special Character!");
      return;
    }

    // create user
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("You Registerd Successfuly");

        navigate(location?.state ? location.state : "/");

        // update profile info
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          console.log("profile info updated");
          window.location.reload();
        });
        // .catch();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };
  return (
    <div>
      {/* <PageTitle title="JobHunter | Register"/> */}
      {/* Register-start */}
      <div>
        <h1 className="mx-auto mt-5 text-5xl text-center font-extrabold uppercase">
          Register 
        </h1>

        {/* form-start */}
        <form onSubmit={handleRegister} className="card-body text-center lg:w-1/2 md:h-3/4 mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name="name" placeholder="Name" className="input input-bordered bg-[#F2F2F2]" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo Url</span>
            </label>
            <input type="text" name="photo" placeholder="Photo Url" className="input input-bordered bg-[#F2F2F2]" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="email" className="input input-bordered bg-[#F2F2F2]" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              name="password"
              className="input input-bordered relative bg-[#F2F2F2]"
              required
            />
            <span
              className="absolute lg:left-[930px] left-[362px] lg:bottom-[140px] bottom-[23px]   text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#065af7] text-white font-bold text-xl">Register</button>
          </div>
        </form>

        {registerError && <p className="text-red-700 text-center font-bold">{registerError}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <p className="text-center">
          Already have an Account ?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
      {/* Register-end */}
    </div>
  );
};

export default Register;
