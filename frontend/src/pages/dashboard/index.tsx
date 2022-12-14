import DashboardLayout from "@components/dashboard-layout";
import useAuth from "@hooks/useAuth";
import { Profile } from "@prisma/client";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPen } from "react-icons/fa";

const DEFAULT_QUANTITY = 20

const Home: NextPage = () => {
  const route = useRouter()

  const [page, setPage] = useState<number>(1);
  const { data: products, refetch } = trpc.useQuery(["stock.getAll", {
    query: "",
    quantity: DEFAULT_QUANTITY,
    page: page,
    maxQuantity: 50
  }]);


  const shouldNextPage = products && products.length === DEFAULT_QUANTITY
  const shouldPrevPage = page && page > 1

  const { user } = useAuth()

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Bem vindo</h1>

      <div className="flex flex-col w-3/4 gap-10">
        <div className="flex w-full gap-10">
          <div className="w-full mt-4">
            <button
              onClick={() => route.push("/dashboard/produtos/cadastrar")}
              className="w-full py-10 bg-slate-600 text-white font-medium text-xl leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
            >Novo produto</button>
          </div>
          <div className="w-full flex-col mt-4 bg-slate-700">
            <button
              onClick={() => route.push("/dashboard/estoque/listar")}
              className="w-full py-10 bg-slate-600 text-white font-medium text-xl leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
            >Editar estoque</button>
          </div>
          <div className="w-full flex-col mt-4">
            {user?.profile === Profile.ADMINISTRATOR && (
              <button
                onClick={() => route.push("/dashboard/relatorios/listar")}
                className="w-full py-10 bg-slate-600 text-white font-medium text-xl leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Relatórios
              </button>)}
          </div>
        </div>

        <div className="w-full h-2/3 flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Produtos com estoque em baixa</h1>
          <table className="w-full table-auto">
            <thead className="text-left">
              <tr>
                <th className="w-">Nome</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products?.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td className="flex items-center gap-2">
                    <Link href={`/dashboard/estoque/editar/${item.id}`}>
                      <FaPen size={24} color="#1e40af" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex mt-5 justify-between">
            <div>
              {
                shouldPrevPage ? (
                  <button
                    className="px-7 py-1 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => setPage(page - 1)}
                  >
                    Anterior
                  </button>) : null
              }
            </div>
            {
              shouldNextPage ? (
                <button
                  className="px-7 py-1 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => setPage(page + 1)}
                >
                  Proximo
                </button>) : null
            }
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Home;
