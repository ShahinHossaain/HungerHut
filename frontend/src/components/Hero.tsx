import hero from "../assets/hero.jpg";
const Hero: React.FC = () => {
  return (
    <div className="">
      <div>
        <img src={hero} className="w-full max-h-[600px] object-cover" />
      </div>
    </div>
  );
};

export default Hero;
