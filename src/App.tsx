import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import TodoStore from './TodoStore.ts';

const todoStore = new TodoStore();
todoStore.loadTodos(); //Loads todos

function App() {
  return (
    <div>
      {toJS(todoStore.todos).map((todo) => (
        <div
          className="mx-auto my-8 mt-10 w-8/12 rounded border border-gray-200 p-4 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none"
          key={todo.id}
        >
          {todo.description}
        </div>
      ))}
    </div>
  );
}

export default observer(App);
