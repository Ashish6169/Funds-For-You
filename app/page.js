import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <>

      <div className="flex justify-center flex-col items-center mx-2 ">
        <h1 className=" flex items-center justify-content my-10 font-bold text-5xl  "> Collect Fund <span className="mx-3"> <img src="/logo.png" alt="Money" height="40px" width="40px" /></span> </h1>
        <p>
          Donate For a Good Cause
        </p>

        <div className="my-5">
          <Link href = {'/login'}>
          <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 
          font-medium rounded-lg 
          text-sm px-5 py-2.5 text-center
           me-2 mb-2"> Start Now</button>
           </Link>

           <Link href={'/aboutus'}>
          <button type="button" className="text-gray-900
           bg-gradient-to-r from-lime-200 via-lime-400 to-lime-
           500 hover:bg-gradient-to-br focus:ring-4 focus:outline
           -none focus:ring-lime-300 dark:focus:ring-lime
           -800 font-medium rounded-lg text-sm px-5 py-2.5 
           text-center me-2 mb-2">Read More </button>
           </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="my-5" >
        <h1 className="text-center"> Donate for Good Cause </h1>


        <div className="item flex justify-around my-5">
        <div className="gap-5 items-center">
            <img   height="150px" width="150px"  className="item rounded-full p-7 " src="/1.jpg" alt="photo" srcset="" />
            <p className="font-bold my-2 text-center"> Fund Yourself </p>
          </div>

          <div className="gap-5 items-center">
            <img  className="item rounded-full p-7 "  height="150px" width="150px" src="/2.webp" alt="photo" srcset="" />
            <p className="font-bold my-2 text-center"> Fund Yourself </p>
          </div>

          <div className="gap-5 items-center">
            <img   height="150px" width="150px"  className="item  rounded-full p-7 " src="/3.png" alt="photo" srcset="" />
            <p className="font-bold my-2 text-center" > Fund Yourself </p>
          </div>
        </div>
      </div>


      <div className="bg-white h-1 opacity-10"></div>

      <div className="my-5" >
        <h1 className="text-center"> Donate for Good Cause </h1>


        <div className="item flex justify-around my-5">
        <div className="gap-5 items-center">
            <img   height="150px" width="150px"  className="item rounded-full p-7 " src="/avatar.gif" alt="photo" srcset="" />
            <p className="font-bold my-2 text-center"> Fund Yourself </p>
          </div>

          <div className="gap-5 items-center">
            <img  className="item rounded-full p-7 "  height="150px" width="150px" src="/logo.png" alt="photo" srcset="" />
            <p className="font-bold my-2 text-center"> Fund Yourself </p>
          </div>

          <div className="gap-5 items-center">
            <img className="item-center rounded-full p-7 " height="150px" width="150px"   src="/money2.jpg" alt="photo" srcset="" />
            <p className="font-bold my-2 text-center" > Community </p>
          </div>
        </div>
      </div>

    </>
  );
}
