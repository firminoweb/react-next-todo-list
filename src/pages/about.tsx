const AboutPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-78px)] p-8">
      <h1 className="text-3xl font-bold mb-4 text-[#32C0C6]">
        Sobre o To-Do List
      </h1>

      <p className="text-lg text-center max-w-2xl text-gray-500">
        O To-Do List é uma ferramenta interna para criação e gestão de listas de
        tarefas. Qualquer funcionário da empresa pode criar uma lista, adicionar
        sub-tarefas, e compartilhar o link com outros para colaboração.
      </p>
    </main>
  );
};

export default AboutPage;
