import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateToDoPage = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleCreate = () => {
    if (title.trim()) {
      // Gera um ID numérico único
      const newToDoId = Date.now();

      // Salva o título no localStorage para associar com o ID
      localStorage.setItem(`todo-title-${newToDoId}`, title);

      // Redireciona para a página de edição com o ID numérico
      router.push(`/edit/${newToDoId}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#32C0C6]">
        Criar Nova To-Do
      </h1>

      <input
        type="text"
        placeholder="Digite o título da lista"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleCreate}
        className="bg-[#32C0C6] text-white p-3 rounded-lg hover:bg-[#28a0a6] transition"
      >
        Criar To-Do
      </button>
    </main>
  );
};

export default CreateToDoPage;
