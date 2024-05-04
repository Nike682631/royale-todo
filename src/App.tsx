import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import TodoStore from './TodoStore.ts';

const todoStore = new TodoStore();

function App() {
  useEffect(() => {
    console.log('I was called');
    todoStore.loadTodos();
    console.log(toJS(todoStore.todos));
  }, [todoStore.todos]);

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
