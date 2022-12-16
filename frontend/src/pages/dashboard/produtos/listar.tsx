import DashboardLayout from "@components/dashboard-layout";
import useAlert from "@hooks/useAlerts";
import { toBRL } from "@shared/convert";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const DEFAULT_QUANTITY = 20

const ListarProdutos: NextPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const { data: products, refetch } = trpc.useQuery(["product.getAll", {
    query,
    quantity: DEFAULT_QUANTITY,
    page: page
  }]);
  const { mutate: deleteProduct } = trpc.useMutation("product.delete");
  const { success, error } = useAlert()

  const handleDelete = useCallback((id: string) => {
    deleteProduct({ id }, {
      onSuccess: () => {
        success("Produto deletado com sucesso!")
        refetch()
      },
      onError: () => { error("Erro ao deletar produto") }
    })
  }, [deleteProduct, refetch, success, error])

  const shouldNextPage = products?.length === DEFAULT_QUANTITY
  const shouldPrevPage = page > 1

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-slate-500 font-bold">Lista de produtos</h1>
      <Link
        href="/dashboard/produtos/cadastrar"
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
            <th>Preço</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {!!products ? products?.map(product => (
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
          )) : <tr><td colSpan={3}>Carregando...</td></tr>}
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
  </DashboardLayout >
}

export default ListarProdutos