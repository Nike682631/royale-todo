import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { MdClose, MdModeEdit } from 'react-icons/md';
import { Todo, TodoStore } from './TodoStore.ts';

const todoStore = new TodoStore();
todoStore.loadTodos(); //Loads todos

type EditMode = {
  index: number;
  isEditing: boolean;
};

function App() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [isExploding, setIsExploding] = React.useState(false);
  const [editMode, setIsEditMode] = React.useState<EditMode>({
    index: 0,
    isEditing: false,
  });

  const largeProps: ConfettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1600,
    colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <ConfettiEffect /> */}
      {isExploding && <ConfettiExplosion {...largeProps} />}
      <div
        className={`transition-opacity transition-transform ${open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} fixed inset-0 z-20 flex min-h-[20vh] w-[40vw] justify-center gap-4 self-center justify-self-center rounded-2xl border bg-slate-100 p-5 drop-shadow-md`}
        id="add-todo-modal"
      >
        <div className="fixed inset-0 z-10 backdrop-brightness-50"></div>
        <div
          className={`transition-opacity ${open ? 'opacity-100' : 'opacity-0'} absolute inset-0 z-20 flex min-h-[20vh] w-[40vw] justify-center gap-4 self-center justify-self-center rounded-2xl border bg-slate-100 p-5 drop-shadow-md`}
        >
          <input
            className="mx-4 h-10 w-full rounded-xl border-2 border-teal-400 p-2 text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="absolute bottom-2 right-2 flex items-center justify-center gap-4">
            <button
              className="flex w-24 items-center justify-center rounded-2xl bg-red-700 p-2 drop-shadow-md"
              onClick={() => {
                setDescription('');
                setOpen(false);
              }}
            >
              Close
            </button>
            <button
              className="flex w-24 items-center justify-center rounded-2xl bg-emerald-600 p-2 drop-shadow-md"
              onClick={() => {
                todoStore.createTodo(new Todo(description));
                setDescription('');
                setIsExploding(true);
                setTimeout(() => {
                  setIsExploding(false);
                }, 2000);
                setOpen(false);
              }}
            >
              Add todo
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="my-2 flex w-8/12 justify-center rounded-3xl border border-gray-200 bg-emerald-600 p-4 shadow-md dark:border-neutral-600"
          onClick={() => setOpen(true)}
        >
          Create todo
        </button>
      </div>
      {todoStore.todos.map((todo, index) => (
        <div
          className="mx-auto my-2 flex w-8/12 justify-between rounded-2xl border border-gray-200 bg-[#111204] p-4 shadow-md dark:border-neutral-600"
          key={toJS(todo.id)}
        >
          {!(editMode.isEditing && editMode.index === index) && (
            <button
              className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full border border-gray-400 ${todo.finished && 'bg-lime-600'}`}
              onClick={() => todo.toggle()}
            >
              {todo.finished && <span className="text-black">&#10004;</span>}
            </button>
          )}
          {editMode.isEditing && editMode.index === index ? (
            <input
              className="mx-4 h-9 w-full rounded-xl border-2 border-teal-400 p-2 text-black"
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <div
              className={`text-white ${todo.finished && 'text-gray-400 line-through'}`}
            >
              {toJS(todo.description)}
            </div>
          )}
          <div className="flex items-center justify-center">
            {editMode.isEditing && editMode.index === index ? (
              <div className="flex items-center">
                <button
                  className={`mr-4 flex h-3 w-3 items-center`}
                  onClick={() => {
                    setIsEditMode({ index, isEditing: false });
                    todo.editDescription(description);
                    setDescription('');
                  }}
                >
                  <FaCheck className="text-lime-700	" />
                </button>
                <button
                  className={`mr-4 flex h-4 w-4 items-center`}
                  onClick={() => {
                    setIsEditMode({ index, isEditing: false });
                    setDescription('');
                  }}
                >
                  <MdClose className="text-red-700	" />
                </button>
              </div>
            ) : (
              <button
                className={`mr-4 flex h-6 w-6 items-center`}
                onClick={() => setIsEditMode({ index, isEditing: true })}
              >
                <MdModeEdit className="text-white" />
              </button>
            )}
            <button
              className={`mr-4 flex h-6 w-6 items-center`}
              onClick={() => todoStore.removeTodo(todo)}
            >
              <FaTrash className="text-red-700	" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default observer(App);
