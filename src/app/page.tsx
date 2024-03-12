import Image from "next/image";
import Function from "./components/functions";

export default function Home() {
  return (
     <div className="min-h-screen md:px-20 px-4 py-10">
      <div className="md:text-[72px] text-[30px] text-[#cccccc] font-black">Project Managemant App.</div>
     
     <Function />
     </div>
  );
}
