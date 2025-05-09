import landingImage from "../assets/landing.png";
import appDownloadImage1 from "../assets/appDownloadImage1.png";
import appDownloadImage2 from "../assets/appDownloadImage2.png";
const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5 h-">
        <img src={landingImage} className="rounded-2xl" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the HungerHut App for faster ordering and personalised
            recommendations
          </span>
          <div className="flex gap-5 mt-5">
            <img className="w-[200px] rounded-2xl" src={appDownloadImage2} />
            <img className="w-[200px] rounded-2xl" src={appDownloadImage1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
