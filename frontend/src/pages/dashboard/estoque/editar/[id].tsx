import DashboardLayout from "@components/dashboard-layout";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useAlert from "@hooks/useAlerts";
import Link from "next/link";
import { CreateSchema } from "@shared/validations/stock";
import { useRouter } from "next/router";

const AlterarEstoque: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    },
  } = useForm<CreateSchema>()

  const { mutate: createStock, data } = trpc.useMutation(["stock.create"])
  const { data: product, isLoading: isLoadingProduct, refetch: refetchProduct } = trpc.useQuery(["product.get", { id }])
  const { data: historicStock, isLoading: isLoadingHistoricStock, refetch: refetchStock } = trpc.useQuery(["stock.get", { id }])
  const { success, error } = useAlert()

  const onSubmit = useCallback(async (data: CreateSchema) => {
    createStock({
      productId: id,
      quantity: Number(data.quantity)
    }, {
      onSuccess: () => {
        success("Estoque alterado com sucesso")
        refetchProduct()
        refetchStock()
      },
      onError: (err) => {
        console.error(err)
        error("Erro ao alterar estoque")
      }
    })
  }, [createStock, error, id, refetchProduct, refetchStock, success])

  const inputStyle = useCallback((hasError: boolean) => {
    let style = `block w-full p-2 text-md font-normal text-slate-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-slate-700 focus:bg-white focus:border-slate-600 focus:outline-none`

    if (hasError) return style + ` border-red-500`
    return style + ` border-slate-300`
  }, [])

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-slate-500 font-bold">Alterar estoque</h1>
      <Link
        href="/dashboard/estoque/listar"
        className="px-7 py-3 bg-slate-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Voltar
      </Link>
    </header>
    <div className="flex flex-row mt-10 gap-5">
      <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Produto</label>
            <input
              type="text"
              id="name"
              disabled
              value={isLoadingProduct ? "carregando..." : product?.name}
              className={inputStyle(false)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Quantidade</label>
            <input
              type="number"
              id="price"
              {...register("quantity", {
                required: true,
              })}
              className={inputStyle(!!errors.quantity)}
            />
          </div>
          <div className="flex flex-col">
            <button
              className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              Adicionar
            </button>
          </div>
        </div>
      </form>
      <div>
        <h1 className="text-2xl text-slate-500 font-bold">Total no estoque: {product?.quantity || 0}</h1>
        <table className="mt-5 w-full table-auto">
          <thead className="">
            <tr>
              <th className="text-left">Data</th>
              <th className="text-left">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingHistoricStock ?
              <tr>
                <td>
                  Carregando...
                </td>
              </tr> :
              historicStock?.map((stock) =>
                <tr key={stock.id} className="text-1xl">
                  <td>{new Date(stock.createdAt).toLocaleDateString()}</td>
                  <td className={stock.quantity > 0 ? "text-green-500" : "text-red-500"}>
                    {stock.quantity}
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout >
}

export default AlterarEstoque