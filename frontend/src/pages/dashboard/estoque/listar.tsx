import DashboardLayout from "@components/dashboard-layout";
import useAlert from "@hooks/useAlerts";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaEdit, FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const ListarEstoque: NextPage = () => {
  const [query, setQuery] = useState("");
  const { data, refetch } = trpc.useQuery(["stock.getAll", { query, quantity: 10, page: 1 }]);
  // const { mutate: disable } = trpc.useMutation("cake.disable");
  const { success } = useAlert()

  const handleDeleteCake = useCallback(async (id: string) => {
    // disable({ id }, {
    //   onSuccess: () => {
    //     success("Bolo deletado com sucesso")
    //     refetch()
    //   }
    // })
    // }, [disable, refetch, success])
  }, [])

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-slate-500 font-bold">Lista de produtos</h1>
      <Link
        href="/dashboard/bolos/cadastrar"
        className="px-7 py-3 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Novo
      </Link>
    </header>
    <div className="w-full mb-5">
      <input
        className="w-full px-4 py-2 text-base font-normal text-slate-700 bg-white bg-clip-padding border border-solid border-slate-300 rounded transition ease-in-out m-0 focus:text-slate-700 focus:bg-white focus:border-slate-600 focus:outline-none"
        placeholder="digite o nome do produto"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
    <div className="w-full h-2/3">
      <table className="w-full table-auto">
        <thead className="text-left">
          <tr>
            <th className="w-">Nome</th>
            <th>Quantidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(item => (
            <tr key={item.id}>
              <td>{item.Product.name}</td>
              <td>{item.quantity}</td>
              <td className="flex items-center gap-2">
                <Link href={`/dashboard/estoque/editar/${item.id}/adicionar`}>
                  <FaPlus size={30} color="#14532d" />
                </Link>
                <Link href={`/dashboard/estoque/editar/${item.id}/remover`}>
                  <FaMinus size={23} color="#7f1d1d" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </DashboardLayout >
}

export default ListarEstoque