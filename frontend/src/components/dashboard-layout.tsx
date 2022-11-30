import Image from "next/image";
import Logo from "@public/logo.png";
import { FaBirthdayCake, FaClipboardList, FaUserFriends, FaUser, FaWarehouse } from "react-icons/fa";
import Link from "next/link";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen">
      <aside className="w-72 bg-[#e2065c]" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3">
          <a href="" className="flex items-center pl-2.5 mb-5">
            <Image src={Logo} alt="logo" width={200} height={100} />
          </a>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/bolos/listar"
                className="group flex items-center p-2 text-base font-normal text-pink-900 rounded-lg dark:text-white hover:bg-pink-100 dark:hover:bg-pink-300 hover:text-white"
              >
                <FaBirthdayCake size={26} color="#FFFFFF" />
                <span className="flex-1 ml-3 whitespace-nowrap text-white group-hover:text-white">
                  Bolos
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/usuarios/listar"
                className="group flex items-center p-2 text-base font-normal text-pink-900 rounded-lg dark:text-white hover:bg-pink-100 dark:hover:bg-pink-300 hover:text-white"
              >
                <FaUser size={26} color="#FFFFFF" />
                <span className="flex-1 ml-3 whitespace-nowrap text-white group-hover:text-white">
                  Usuários
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/estoque/listar"
                className="group flex items-center p-2 text-base font-normal text-pink-900 rounded-lg dark:text-white hover:bg-pink-100 dark:hover:bg-pink-300 hover:text-white"
              >
                <FaWarehouse size={26} color="#FFFFFF" />
                <span className="flex-1 ml-3 whitespace-nowrap text-white group-hover:text-white">
                  Estoque
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/dashboard/pedidos/criar"
                className="group flex items-center p-2 text-base font-normal text-pink-900 rounded-lg dark:text-white hover:bg-pink-100 dark:hover:bg-pink-300 hover:text-white"
              >
                <FaClipboardList size={26} color="#FFFFFF" />
                <span className="flex-1 ml-3 whitespace-nowrap text-pink-800 group-hover:text-white">
                  Pedidos
                </span>
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-pink-600 bg-pink-200 rounded-full dark:bg-pink-900 dark:text-pink-200">
                  3
                </span>
              </Link>
            </li> */}
          </ul>
        </div>
      </aside >
      <div className="w-full p-6">{children}</div>
    </div >
  );
}

export default DashboardLayout;
