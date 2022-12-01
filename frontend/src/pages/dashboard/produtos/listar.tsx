import DashboardLayout from "@components/dashboard-layout";
import useAlert from "@hooks/useAlerts";
import { toBRL } from "@shared/convert";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListarEstoque: NextPage = () => {
  const [query, setQuery] = useState("");
  const { data: products, refetch } = trpc.useQuery(["product.getAll", { query }]);
  // const { mutate: disable } = trpc.useMutation("product.disable");
  const { success } = useAlert()

  const handleDelete = useCallback(async (id: string) => {
    // disable({ id }, {
    //   onSuccess: () => {
    //     success("Bolo deletado com sucesso")
    //     refetch()
    //   }
    // })
  }, [])

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-pink-500 font-bold">Lista de produtos</h1>
      <Link
        href="/dashboard/bolos/cadastrar"
        className="px-7 py-3 bg-pink-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-pink-700 hover:shadow-lg focus:bg-pink-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Novo
      </Link>
    </header>
    <div className="w-full mb-5">
      <input
        className="w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none"
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
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{toBRL(product.price)}</td>
              <td className="flex items-center gap-2">
                <Link href={`/dashboard/produtos/editar/${product.id}`}>
                  <FaEdit size={30} color="#1e40af" />
                </Link>
                <span className="cursor-pointer" onClick={() => handleDelete(product.id)}>
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