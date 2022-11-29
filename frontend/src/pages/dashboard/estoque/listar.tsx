import DashboardLayout from "@components/dashboard-layout";
import useAlert from "@hooks/useAlerts";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListarEstoque: NextPage = () => {
  const [query, setQuery] = useState("");
  const { data, refetch } = trpc.useQuery(["cake.getAll", { query }]);
  const { mutate: disable } = trpc.useMutation("cake.disable");
  const { success } = useAlert()

  const handleDeleteCake = useCallback(async (id: string) => {
    disable({ id }, {
      onSuccess: () => {
        success("Bolo deletado com sucesso")
        refetch()
      }
    })
  }, [disable, refetch, success])

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-purple-500 font-bold">Lista de produtos</h1>
      <Link
        href="/dashboard/bolos/cadastrar"
        className="px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Novo
      </Link>
    </header>
    <div className="w-full mb-5">
      <input
        className="w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
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
            <th>Preço</th>
            <th>Descrição</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map(cake => (
            <tr key={cake.id}>
              <td>{cake.name}</td>
              <td>R$ {cake.price}</td>
              <td>{cake.description}</td>
              <td>{cake.status ? "ativo" : "desativado"}</td>
              <td className="flex items-center gap-2">
                <Link href={`/dashboard/bolos/editar/${cake.id}`}>
                  <FaEdit size={30} color="#1e40af" />
                </Link>
                <span className="cursor-pointer" onClick={() => handleDeleteCake(cake.id)}>
                  <FaTrash size={23} color="#991b1b" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </DashboardLayout >
}

export default ListarEstoque