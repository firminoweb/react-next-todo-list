import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

// Define a estrutura de um item de To-Do, incluindo sub-itens e um ID opcional do item pai
interface ToDoItem {
  id: string;
  text: string;
  subItems: ToDoItem[];
  parentId?: string;
}

// Configura o elemento raiz para o React Modal, necessário para acessibilidade
if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

const EditToDoPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da URL

  // Estado que armazena os itens do To-Do
  const [items, setItems] = useState<ToDoItem[]>([]);

  // Estados que controlam o texto do novo item e do novo sub-item
  const [newItemText, setNewItemText] = useState('');
  const [newSubItemText, setNewSubItemText] = useState('');

  // Estado que armazena o título do To-Do e controla a edição do título
  const [title, setTitle] = useState('Novo To-Do');
  const [editingTitle, setEditingTitle] = useState(false);

  // Estados que controlam a abertura do modal, o ID do sub-item atual e o ID do item pai selecionado para movimentação
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSubItemId, setCurrentSubItemId] = useState<string | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  // useEffect que carrega os itens e o título do To-Do do localStorage ao montar o componente
  useEffect(() => {
    if (id) {
      const storedItems = localStorage.getItem(`todo-${id}`);
      const storedTitle = localStorage.getItem(`todo-title-${id}`);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
      if (storedTitle) {
        setTitle(storedTitle);
      }
    }
  }, [id]);

  // Função que salva os itens atualizados no estado e no localStorage
  const saveItems = (updatedItems: ToDoItem[]) => {
    setItems(updatedItems);
    localStorage.setItem(`todo-${id}`, JSON.stringify(updatedItems));
  };

  // Função que salva o título atualizado no estado e no localStorage
  const saveTitle = (newTitle: string) => {
    setTitle(newTitle);
    localStorage.setItem(`todo-title-${id}`, newTitle);
  };

  // Função que adiciona um novo item à lista de To-Dos
  const handleAddItem = () => {
    if (newItemText.trim()) {
      const newItem: ToDoItem = {
        id: `${Date.now()}`, // Gera um ID único baseado na data e hora atual
        text: newItemText,
        subItems: [],
      };
      saveItems([...items, newItem]);
      setNewItemText(''); // Reseta o campo de texto do novo item
    }
  };

  // Função que edita o texto de um item existente
  const handleEditItem = (itemId: string, newText: string) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, text: newText } : item,
    );
    saveItems(updatedItems);
  };

  // Função que deleta um item ou sub-item da lista de To-Dos
  const handleDeleteItem = (itemId: string, isSubItem: boolean = false) => {
    const updatedItems = isSubItem
      ? items.map((item) => ({
          ...item,
          subItems: item.subItems.filter((subItem) => subItem.id !== itemId),
        }))
      : items.filter((item) => item.id !== itemId);

    saveItems(updatedItems);
  };

  // Função que adiciona um novo sub-item a um item existente
  const handleAddSubItem = (parentId: string) => {
    if (newSubItemText.trim()) {
      const newSubItem: ToDoItem = {
        id: `${Date.now()}`,
        text: newSubItemText,
        subItems: [],
        parentId,
      };
      const updatedItems = items.map((item) =>
        item.id === parentId
          ? { ...item, subItems: [...item.subItems, newSubItem] }
          : item,
      );
      saveItems(updatedItems);
      setNewSubItemText(''); // Reseta o campo de texto do novo sub-item
    }
  };

  // Função que move um sub-item para um novo item pai
  const handleMoveSubItem = () => {
    if (!currentSubItemId || !selectedParentId) return;

    const subItemToMove = items
      .flatMap((item) => item.subItems)
      .find((subItem) => subItem.id === currentSubItemId);

    if (!subItemToMove) return;

    const updatedItems = items
      .map((item) => ({
        ...item,
        subItems: item.subItems.filter(
          (subItem) => subItem.id !== currentSubItemId,
        ),
      }))
      .map((item) =>
        item.id === selectedParentId
          ? { ...item, subItems: [...item.subItems, subItemToMove] }
          : item,
      );

    saveItems(updatedItems);
    closeModal(); // Fecha o modal após mover o sub-item
  };

  // Função que promove um sub-item para se tornar um item principal
  const handlePromoteSubItem = (subItemId: string) => {
    const updatedItems: ToDoItem[] = [];
    let subItemToPromote: ToDoItem | undefined;

    for (const item of items) {
      if (item.subItems.some((subItem) => subItem.id === subItemId)) {
        subItemToPromote = item.subItems.find(
          (subItem) => subItem.id === subItemId,
        );
        updatedItems.push({
          ...item,
          subItems: item.subItems.filter((subItem) => subItem.id !== subItemId),
        });
      } else {
        updatedItems.push(item);
      }
    }

    if (subItemToPromote) {
      saveItems([
        ...updatedItems,
        { ...subItemToPromote, parentId: undefined },
      ]);
    }
  };

  // Função que abre o modal para mover um sub-item
  const openModal = (subItemId: string) => {
    setCurrentSubItemId(subItemId);
    setModalIsOpen(true);
  };

  // Função que fecha o modal e reseta os estados relacionados
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentSubItemId(null);
    setSelectedParentId(null);
  };

  // Função que deleta o To-Do inteiro e redireciona para a página inicial
  const handleDeleteToDo = () => {
    localStorage.removeItem(`todo-${id}`);
    localStorage.removeItem(`todo-title-${id}`);
    router.push('/');
  };

  // Função que habilita a edição do título do To-Do
  const handleTitleEdit = () => {
    setEditingTitle(true);
  };

  if (!id) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto o ID não é obtido
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4 text-[#32C0C6]">
        Editar To-Do: {title}
      </h1>

      {/* Renderiza o input para editar o título se o estado de edição estiver ativo, caso contrário, renderiza o botão para habilitar a edição */}
      {editingTitle ? (
        <input
          type="text"
          value={title}
          onChange={(e) => saveTitle(e.target.value)}
          onBlur={() => setEditingTitle(false)}
          className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Editar título do To-Do"
        />
      ) : (
        <button
          onClick={handleTitleEdit}
          className="text-sm text-blue-500 underline mb-4"
        >
          Editar Título
        </button>
      )}

      {/* Input para adicionar um novo item */}
      <input
        type="text"
        placeholder="Novo item"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleAddItem}
        className="bg-[#32C0C6] text-white p-3 rounded-lg mb-4 hover:bg-[#28a0a6] transition"
      >
        Adicionar Item
      </button>

      {/* Renderiza a lista de itens e sub-itens */}
      <div className="w-full max-w-md">
        {items.map((item) => (
          <div key={item.id} className="mb-4 border-b pb-4">
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleEditItem(item.id, e.target.value)}
              className="w-full p-2 mb-2 border rounded-lg"
            />
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="bg-red-500 text-white p-2 rounded-lg text-sm mr-2"
            >
              Excluir
            </button>

            {/* Input e botão para adicionar um sub-item */}
            <div className="flex items-center mt-3">
              <input
                type="text"
                placeholder="Texto do sub-item"
                value={newSubItemText}
                onChange={(e) => setNewSubItemText(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={() => handleAddSubItem(item.id)}
                className="bg-blue-500 text-white p-2 rounded-lg text-sm ml-2"
              >
                Adicionar
              </button>
            </div>

            {/* Renderiza sub-itens, permitindo mover, promover ou excluir */}
            {item.subItems.length > 0 && (
              <div className="ml-4 mt-2">
                {item.subItems.map((subItem) => (
                  <div key={subItem.id} className="mb-2">
                    <input
                      type="text"
                      value={subItem.text}
                      onChange={(e) =>
                        handleEditItem(subItem.id, e.target.value)
                      }
                      className="w-full p-2 mb-1 border rounded-lg"
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModal(subItem.id)}
                        className="bg-green-500 text-white p-2 rounded-lg text-sm"
                      >
                        Mover Sub-item
                      </button>
                      <button
                        onClick={() => handlePromoteSubItem(subItem.id)}
                        className="bg-yellow-500 text-white p-2 rounded-lg text-sm"
                      >
                        Promover a Item Principal
                      </button>
                      <button
                        onClick={() => handleDeleteItem(subItem.id, true)}
                        className="bg-red-500 text-white p-2 rounded-lg text-sm"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="p-5 w-full" />

      {/* Modal para mover sub-item */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Mover Sub-item"
      >
        <h2 className="text-lg font-bold mb-4">Mover Sub-item</h2>
        <div>
          <label htmlFor="parentSelect" className="block mb-2">
            Selecionar novo item pai:
          </label>

          <select
            id="parentSelect"
            value={selectedParentId || ''}
            onChange={(e) => setSelectedParentId(e.target.value)}
            className="mb-4 p-2 border rounded-lg w-full"
          >
            <option value="">Selecionar...</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            ))}
          </select>
          <button
            onClick={handleMoveSubItem}
            className="bg-blue-500 text-white p-2 rounded-lg text-sm"
          >
            Mover
          </button>
        </div>
      </Modal>

      {/* Botão para excluir o To-Do inteiro */}
      <button
        onClick={handleDeleteToDo}
        className="bg-red-500 text-white p-3 rounded-lg mt-8 hover:bg-red-700 transition"
      >
        Excluir To-Do
      </button>
    </main>
  );
};

export default EditToDoPage;
