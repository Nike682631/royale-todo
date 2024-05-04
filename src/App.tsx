import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { TodoStore } from './TodoStore.ts';

const todoStore = new TodoStore();
todoStore.loadTodos(); //Loads todos

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={`${!open && 'hidden'}`} id="add-todo-modal">
        <div className="fixed inset-0 z-10 backdrop-brightness-50"></div>
        <div className="w-40vh absolute z-20 h-[30vh]">
          <button onClick={() => setOpen(false)}>close</button>
        </div>
      </div>
      <button onClick={() => setOpen(false)}>Create todo</button>
      {todoStore.todos.map((todo) => (
        <div
          className="mx-auto my-8 mt-10 flex w-8/12 rounded rounded-2xl border border-gray-200 bg-[#111204] p-4 shadow-md dark:border-neutral-600"
          key={toJS(todo.id)}
        >
          <button
            className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full border border-gray-400 ${todo.finished && 'bg-lime-600'}`}
            onClick={() => todo.toggle()}
          >
            {todo.finished && <span className="text-black">&#10004;</span>}
          </button>
          <div
            className={`text-white ${todo.finished && 'text-gray-400 line-through'}`}
          >
            {toJS(todo.description)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default observer(App);
