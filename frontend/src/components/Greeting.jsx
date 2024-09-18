/**
 * Green conversation box that greets
 * @text the greeting to chun out
 */

export default function Greeting({ text }) {
    return (
      <div className="w-fit mx-auto relative border border-transparent">
        <div className="flex justify-between items-center bg-[#00B207] px-[6.5px] py-[9px] mb-[9px] font-medium rounded-lg">
          <small className="text-sm text-white whitespace-nowrap mx-auto">{text}</small>
        </div>
        <div className="absolute bottom-0 left-[59px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-[#00B207]"></div>
      </div>
    );
  }
  