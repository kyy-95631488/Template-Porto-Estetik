import Link from "next/link";
import { usePathname } from "next/navigation";

// icons
import {
  HiHome,
  HiUserCircle,
  HiBriefcase,
  HiAcademicCap,
  HiLightBulb,
  HiPhoneArrowUpRight,
} from "react-icons/hi2";

// nav data
export const navData = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUserCircle },
  { name: "projects", path: "/projects", Icon: HiLightBulb },
  { name: "experience", path: "/experience", Icon: HiBriefcase },
  { name: "education", path: "/education", Icon: HiAcademicCap },
  { name: "contact", path: "/contact", Icon: HiPhoneArrowUpRight },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max xl:h-screen bottom-0 mt-auto xl:mt-0 xl:right-[2%] z-50 top-0 xl:top-auto w-full xl:w-16 xl:max-w-md">
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 bg-white/10 backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full">
        {navData.map((link, i) => (
          <Link
            className={`${
              link.path === pathname && "text-accent"
            } relative flex items-center group hover:text-accent transition-all duration-300`}
            href={link.path}
            key={i}
          >
            {/* tooltip */}
            <div
              role="tooltip"
              className="absolute pr-14 right-0 hidden xl:group-hover:flex"
            >
              <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                <div className="text-[12px] leading-none font-semibold capitalize">
                  {link.name}
                </div>
                <div
                  className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"
                  aria-hidden
                />
              </div>
            </div>

            {/* icon */}
            <div>
              <link.Icon aria-hidden />
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
