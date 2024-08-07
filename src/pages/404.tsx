import React from 'react';
import Image from 'next/image';

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full text-center">
        <h1 className="text-3xl mb-2 font-semibold text-[#32C0C6]">
          Página não encontrada
        </h1>

        <h3 className="d-block text-xl text-gray-500">
          Verifique se a escrita está correta ou tente novamente
        </h3>

        <Image
          className="mx-auto mt-10"
          src="/not_found.png"
          alt="Página não encontrada"
          width={400}
          height={438}
          priority
        />
      </div>
    </main>
  );
};

export default NotFound;
