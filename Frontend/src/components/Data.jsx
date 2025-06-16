import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import send_icon from '../assets/send_icon.svg';
import toast from 'react-hot-toast';

const Data = () => {
  const { axios, todos, setTodos } = useAppContext();
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track which todo is being edited
  const [editText, setEditText] = useState("");     // Store edited text

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/todo/create', { text });
      if (data.success) {
        toast.success(data.message);
        const newTodos = [{text},...todos];
        setTodos(newTodos);
        setText("");
        
        // Optionally fetch updated list from DB
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (id) => {
    try{

      const {data} = await axios.delete(`/todo/delete/${id}`);
      if(data.success) {
        toast.success(data.message);
        const newTodos = todos.filter(todo => todo._id != id);
        setTodos(newTodos);
      }
      else console.log(data.error);
    }
    catch(error) {
      console.log(error);
    }
  }
  const onSaveEdit = async (id, index) => {
    try {
      const { data } = await axios.put(`/todo/update/${id}`, { text: editText });
      if (data.success) {
        toast.success(data.message);
        const newTodos = [...todos];
        newTodos[index].text = editText;
        setTodos(newTodos);
        setEditIndex(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Input Box */}
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder-gray-500 text-sm"
          type="text"
          placeholder="Take a text"
        />
        <button
          onClick={onSubmitHandler}
          className="ml-2 bg-[#A1D33C] hover:bg-[#83ad2e] rounded-full p-2 transition-all duration-200"
        >
          <img src={send_icon} alt="Send" className="w-5 h-5" />
        </button>
      </div>

      {/* Todo List */}
      <ul className="mt-6 space-y-3">
        {todos.map((todo, index) => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-white shadow-sm p-3 rounded-md border border-gray-200"
          >
            {
              editIndex === index ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 border-b border-gray-300 outline-none text-sm mr-3"
                />
              ) : (
                <span className="text-gray-800 flex-1">{todo.text}</span>
              )
            }
            <div className="flex space-x-2">
              {
                editIndex === index ? (
                  <button
                    onClick={() => onSaveEdit(todo._id, index)}
                    className="text-sm px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all"
                  >Save</button>
                ) : (
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditText(todo.text);
                    }}
                    className="text-sm px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all"
                  >Edit</button>
                )
              }
              <button onClick={() => onDelete(todo._id)}
                className="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all"
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
