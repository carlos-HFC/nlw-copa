import Image from "next/image";

import { FormPool } from "@/components/form-pool";

import { getDataCount } from "@/data/get-data-count";

export default async function Home() {
  const { data } = await getDataCount({
    next: {
      revalidate: 60 * 10 //10min
    }
  });

  return (
    <div className="max-w-6xl h-dvh mx-auto grid grid-cols-2 place-items-center gap-28">
      <main>
        <Image
          src="/logo.svg"
          alt="NLW Copa"
          width={213}
          height={41}
        />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src="/users-avatar-example.png"
            alt="NLW Copa"
            width={158}
            height={57}
          />

          <strong className="text-gray-100 text-xl">
            <span className="text-green-500">+{data.users}</span> pessoas já estão usando
          </strong>
        </div>

        <FormPool />

        <p className="text-gray-300 leading-relaxed mt-4 text-sm">Após criar o seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className="mt-10 pt-10 border-t border-gray-600 divide-x divide-gray-600 grid grid-cols-2 text-gray-100">
          <div className="w-full flex items-center gap-6">
            <Image
              src="/icon-check.svg"
              alt=""
              width={40}
              height={41}
            />

            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{data.pools}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-full flex items-center gap-6 justify-end">
            <Image
              src="/icon-check.svg"
              alt=""
              width={40}
              height={41}
            />

            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{data.guesses}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src="/app-nlw-copa-preview.png"
        alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
        width={518}
        height={605}
        quality={100}
      />
    </div>
  );
}
