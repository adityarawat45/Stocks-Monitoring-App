import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("src/images/bg.jpg")' }}>
      <nav className="flex flex-row justify-between items-center px-3 py-2 backdrop-blur-lg  bg-slate-600 bg-opacity-20">
        <div className="flex flex-row gap-5 justify-start items-center">
          <img src='src/images/User.png' className="h-8 w-8" alt="user"></img>
           <h5 className="text-white font-medium ">Home</h5>
           <h5 className="text-white font-medium ">About</h5>
           <h5 className="text-white font-medium ">Help</h5>
           <h5 className="text-white font-medium ">Explore</h5>
        </div>
        <div  onClick={()=> navigate("/signup")} className="bg-gradient-to-r from-blue-950 to-blue-500 px-3 py-2 rounded-md text-white font-semibold">Sign In</div>
      </nav>
      <body className="flex flex-col justify-center items-center">

        <div className="flex flex-col justify-center items-center">
        <div className="mx-5 my-5">
          <h3 className="bg-gradient-to-r from-blue-500 to-violet-950 text-transparent bg-clip-text  bg-transparent font-bold text-7xl ">Stoxx</h3>
        </div>
            <h3 className="text-gray-100 text-4xl font-bold">The Best Stock</h3>
            <h3 className="text-gray-100 text-4xl font-bold">Monitoring Platform Out There!</h3>
        </div>
        <div className="background-blur-lg bg-black bg-opacity-20 mt-5 rounded-md px-5 w-2/3 pt-5">
          <p className="text-white font-normal">"Stoxx is a cutting-edge stocks monitoring platform designed to empower investors with real-time insights and comprehensive analysis. With its intuitive interface and advanced features, Stoxx provides users with a seamless experience for tracking their investments and making informed decisions. From monitoring individual stocks to analyzing market trends, Stoxx offers a range of tools and customizable dashboards tailored to meet the diverse needs of investors. Whether you're a seasoned trader or just starting out, Stoxx equips you with the tools and information you need to stay ahead in today's dynamic markets."</p>
          <div className="flex flex-row justify-end gap-5 items-end my-3">
            <button onClick={()=> navigate("/signup")} className="bg-gradient-to-r from-blue-700 to-violet-950 text-white py-1 px-2 rounded-md ">Sign Up</button>
            <button onClick={()=> navigate("/signup")} className="bg-gradient-to-r from-blue-700 to-violet-950 py-1 px-2 text-white rounded-md ">Sign In</button>
          </div>
        </div>
      </body>
    </div>
  )
}

export default Home;
