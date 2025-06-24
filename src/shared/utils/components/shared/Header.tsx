import Image from "next/image";

export const Header = () => {
  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Image src={"/logo1.png"} alt="spider-man" width={100} height={120} />
        </div>
        <div className="navbar-center">
          <a className="btn  text-xl">Spider-Man</a>
        </div>
        <div className="navbar-end">
          
        </div>
      </div>
    </header>
  );
};
