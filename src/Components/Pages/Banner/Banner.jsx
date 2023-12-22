// import bannerImg from '../../../assets/871 [Converted].svg';
import '../../Styles/text.css';
import '../../Styles/bannerbutton.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative">
      <img className="w-full h-30vh" src="https://st2.depositphotos.com/2466369/47349/v/600/depositphotos_473495782-stock-illustration-time-management-concept-in-flat.jpg" alt="" />
      <div className="absolute  md:text-2xl md:left-14 md:top-48 text-[#332fb2] font-extrabold lg:text-5xl text-base lg:left-40 left-2 lg:top-[350px] top-[120px]">
        <h1>Manage Your Task</h1>

        <Link to="/login">
          <button className="mt-10 btn btn-primary">Let's Explore</button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
