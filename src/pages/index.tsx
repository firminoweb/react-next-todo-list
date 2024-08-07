import Link from 'next/link';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaEye, FaEdit, FaTrashAlt, FaShareAlt } from 'react-icons/fa';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

// Interface que define a estrutura de um item de ToDo, incluindo sub-itens e ID do item pai (opcional)
interface ToDoItem {
  id: string;
  text: string;
  subItems: ToDoItem[];
  parentId?: string;
}

const HomePage = () => {
  // Estado que armazena todos os To-Dos salvos
  const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);

  // Estado que armazena o To-Do selecionado para visualização no modal
  const [selectedToDo, setSelectedToDo] = useState<ToDoItem[] | null>(null);

  // Estado que controla a visibilidade do modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Estado que armazena o título do To-Do sendo visualizado
  const [modalTitle, setModalTitle] = useState('');

  // Estado que armazena a URL a ser compartilhada
  const [shareUrl, setShareUrl] = useState<string>('');

  // Estado que identifica qual To-Do está sendo compartilhado, usado para exibir ou ocultar botões de compartilhamento
  const [activeShareId, setActiveShareId] = useState<string | null>(null);

  // useEffect que carrega os To-Dos do localStorage quando o componente é montado
  useEffect(() => {
    // Recupera todas as chaves do localStorage que começam com 'todo-title-' e mapeia para um objeto { id, title }
    const storedToDos = Object.keys(localStorage)
      .filter((key) => key.startsWith('todo-title-'))
      .map((key) => ({
        id: key.replace('todo-title-', ''), // Remove o prefixo 'todo-title-' para obter o ID
        title: localStorage.getItem(key) || 'Sem Título', // Obtém o título do To-Do ou usa 'Sem Título' se não existir
      }));
    setTodos(storedToDos); // Define os To-Dos no estado
  }, []);

  // Função para deletar um To-Do do localStorage e atualizar o estado
  const handleDeleteToDo = (id: string) => {
    localStorage.removeItem(`todo-${id}`); // Remove os itens do To-Do
    localStorage.removeItem(`todo-title-${id}`); // Remove o título do To-Do
    setTodos(todos.filter((todo) => todo.id !== id)); // Atualiza o estado removendo o To-Do deletado
  };

  // Função que abre o modal para visualizar um To-Do específico
  const openModal = (id: string) => {
    const storedItems = localStorage.getItem(`todo-${id}`); // Obtém os itens do To-Do do localStorage
    const title = localStorage.getItem(`todo-title-${id}`); // Obtém o título do To-Do do localStorage
    if (storedItems) {
      setSelectedToDo(JSON.parse(storedItems)); // Define os itens do To-Do no estado
      setModalTitle(title || 'Sem Título'); // Define o título no estado
      setModalIsOpen(true); // Abre o modal
    }
  };

  // Função que fecha o modal e reseta os estados relacionados
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedToDo(null);
  };

  // Função que trata o compartilhamento de um To-Do, gerando a URL e alternando o estado de compartilhamento ativo
  const handleShare = (id: string) => {
    const url = `${window.location.origin}/edit/${id}`; // Gera a URL completa do To-Do
    setShareUrl(url); // Define a URL de compartilhamento no estado
    setActiveShareId((prev) => (prev === id ? null : id)); // Alterna entre exibir ou ocultar os botões de compartilhamento
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-78px)] p-8">
      {/* Cabeçalho da página */}
      <h1 className="text-4xl font-bold mb-4 text-[#32C0C6]">
        Bem vindo ao To-Do List
      </h1>

      {/* Descrição da página */}
      <p className="text-lg text-center mb-8 text-gray-500">
        Crie, edite e compartilhe suas listas de tarefas com facilidade. Comece
        criando uma nova lista ou acessando uma já existente.
      </p>

      {/* Links para criar um novo To-Do e acessar a página Sobre */}
      <div className="space-x-4 mb-8">
        <Link href="/create" className="text-[#32C0C6] font-bold">
          Criar nova To-Do
        </Link>
        <Link href="/about" className="text-[#32C0C6] font-bold">
          Sobre
        </Link>
      </div>

      <hr className="p-5 w-full" />

      {/* Se houver To-Dos, exibe a lista; caso contrário, exibe uma mensagem */}
      {todos.length > 0 ? (
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-[#32C0C6]">
            Minhas To-Dos
          </h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="mb-4 p-4 border rounded-lg">
                <h3 className="text-xl font-semibold text-gray-600">
                  {todo.title}
                </h3>
                <div className="flex space-x-4 mt-2">
                  {/* Botão para visualizar o To-Do */}
                  <button
                    onClick={() => openModal(todo.id)}
                    className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    title="Visualizar"
                  >
                    <FaEye />
                  </button>
                  {/* Link para editar o To-Do */}
                  <Link href={`/edit/${todo.id}`}>
                    <button
                      className="bg-green-400 text-white p-2 rounded-md hover:bg-green-600 transition"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                  </Link>
                  {/* Botão para excluir o To-Do */}
                  <button
                    onClick={() => handleDeleteToDo(todo.id)}
                    className="bg-red-400 text-white p-2 rounded-md hover:bg-red-600 transition"
                    title="Excluir"
                  >
                    <FaTrashAlt />
                  </button>
                  {/* Botão para compartilhar o To-Do */}
                  <button
                    onClick={() => handleShare(todo.id)}
                    className={`p-2 rounded-md transition ${
                      activeShareId === todo.id
                        ? 'bg-yellow-600 text-white'
                        : 'bg-yellow-400 text-white hover:bg-yellow-600'
                    }`}
                    title="Compartilhar"
                  >
                    <FaShareAlt />
                  </button>
                </div>
                {/* Botões de compartilhamento que aparecem apenas quando o ID do To-Do corresponde ao ID ativo de compartilhamento */}
                {activeShareId === todo.id && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg flex space-x-2">
                    <FacebookShareButton url={shareUrl} title={todo.title}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={todo.title}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <button
                      onClick={() => navigator.clipboard.writeText(shareUrl)}
                      className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-600 transition"
                    >
                      Copiar Link
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-center text-gray-500">
          Nenhuma To-Do cadastrada ainda. Crie uma nova para começar.
        </p>
      )}

      {/* Modal para Visualização */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Visualizar To-Do"
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>
          <div className="max-h-[70vh] overflow-y-auto">
            {selectedToDo ? (
              <>
                <h3 className="text-lg font-semibold mb-2">Itens:</h3>
                {selectedToDo.map((item) => (
                  <div key={item.id} className="mb-4">
                    <h4 className="text-md font-semibold">{item.text}</h4>
                    {item.subItems.length > 0 && (
                      <>
                        <h5 className="text-sm font-semibold mt-2 ml-4">
                          Sub-Items:
                        </h5>
                        <ul className="ml-6 mt-1 list-disc">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.id}>{subItem.text}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p>Nenhum item encontrado.</p>
            )}
          </div>
          <button
            onClick={closeModal}
            className="bg-[#32C0C6] text-white p-3 rounded-lg mt-4 hover:bg-[#28a0a6] transition"
          >
            Fechar
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default HomePage;
