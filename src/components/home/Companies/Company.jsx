const Company = () => {
  // List of well-known company logos
  const companyLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/640px-Facebook_Logo_%282019%29.png",
    "https://finshiksha.com/wp-content/uploads/2022/04/Nykaa-Banner-Image.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://www.shutterstock.com/image-vector/amazon-icon-editorial-logo-isolated-260nw-2308438905.jpg",
    "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    "https://1000logos.net/wp-content/uploads/2021/06/Zoom-Logo.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRplxeCAGhtXZ2uav3EKQj2Wc-g1geojNH6Ak3r1olJiQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkxKl-xEeKOHbysLOWtdOkKM_i-Vup2e1iTygvkS9kw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNYutxpDhpaCF-qkyQPow3lbG8B4cBnvG8A1i7qXL3A&s"

    // Add more company logos as needed
  ];

  return (
    <div className="company cards pt-10 flex flex-col gap-[50px] w-full justify-evenly items-center">
      <h1 className="text-3xl">Top Companies trust us</h1>
      <div className="company-images-container">
        <div className="company-images">
          {companyLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Company ${index + 1}`}
              className="company-logo"
            />
          ))}
        </div>
      </div>
   <div className="w-full h-[1px] bg-slate-300	">

   </div>
      <div className="content flex justify-evenly items-center w-full">
        <div className="flex flex-col gap-[10px]">
            <h1 className="text-center text-blue-400 text-5xl">300K+</h1>
            <p>Companies hiring</p>
        </div>
        <div className="flex flex-col gap-[10px]">
            <h1 className="text-center text-blue-400 text-5xl">10K+</h1>
            <p>new openings everyday</p>
        </div>
        <div className="flex flex-col gap-[10px]">
            <h1 className="text-center text-blue-400 text-5xl">21Mn+</h1>
            <p className="text-center">active students</p>
        </div>
        <div className="flex flex-col gap-[10px]">
            <h1 className="text-center text-blue-400 text-5xl">600K+</h1>
            <p className="text-center">learners</p>
        </div>
      </div>
      <div className="flex justify-evenly w-full h-[30vh] items-center bg-blue-500">
        <h1 className="text-4xl text-white">Empower your career with <br/> Internshala today</h1>
        <div className="btns flex gap-[50px]">
            <button className="google bg-white p-3 rounded flex gap-2 items-center">
               <img className="w-[30px] h-[20px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdOPSU8ZvGs4ZvCIg4fgxRJXg5W1RcEOplXBwH3uxjQ&s" alt="" /> Continue with Google
            </button>
            <button className="register bg-blue-700 pr-6 pl-6 text-white rounded ">
                Register
            </button>
        </div>
      </div>
    </div>
  );
};

export default Company;
