import { PersonOutline, ChevronDown, SearchOutline } from "react-ionicons";

function Navbar() {
  return (
    <div className="md:w-[calc(100%)] w-[calc(100%)-60px] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border rounded-br-3xl rounded-bl-3xl">
      <div className="flex items-center gap-3 cursor-pointer mr-2">
        <PersonOutline width={"28px"} height={"28px"} />
        <span className="text-black font-semibold text-sm md:text-lg whitespace-nowrap">
          Board Name
        </span>
        <ChevronDown width={"16px"} height={"16px"} color={"red"} />
      </div>

      <div className="flex items-center gap-3 md:w-[600px] w-[130px] border rounded-lg px-3 py-[10px]">
        <SearchOutline width={"21px"} height={"21px"} />
        <input
          placeholder="Search"
          type="text"
          className="w-full outline-none bg-transparent text-[15px]"
        />
      </div>
    </div>
  );
}

export default Navbar;
