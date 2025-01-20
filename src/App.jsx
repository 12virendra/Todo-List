
import { useState } from 'react'
import './App.css'
import { TodoProvider } from './Context'
import { useEffect } from 'react';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';

function App() {
const [todos,setTodos]=useState([]); 

const addTodo=(todo)=>{
                // [...prev] creates a new array that includes all the elements from the previous state.
setTodos((prev)=>[...prev,{id:Date.now(),...todo}]); //This is a callback function that takes the previous state (prev) of todo and returns a new array with the new todo item added to it.
                       //{ id: Date.now(), ...todo } creates a new todo object with a unique id and the properties of the todo object.
 }


const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?todo:prevTodo)));
}

const deleteTodo=(id=>{
  setTodos((prev)=>prev.filter((todo)=>todo.id != id))
})

const toggleComplete=(id)=>{         //The line { ...todo, completed } is used to create a new object that includes all the properties of the todo object, with an additional or updated completed property. This is a common pattern in JavaScript and React to create a new object with some modifications while preserving the original properties.
setTodos((prev)=>prev.map((todo)=>todo.id===id ?{...todo,completed:!todo.completed}:todo));
}



// From now code of LocalStorage .


useEffect(()=>{         // localStorage.getItem('todos') is used to retrieve the value associated with the key 'todos' from the browser's localStorage.In getItem() we pass key of the value we want to retrieve.
  const todos=JSON.parse(localStorage.getItem('todos')); // is used to retrieve and parse the todos data stored in the browser's localStorage. The JSON.parse method is applied to convert the JSON string stored in localStorage back into a JavaScript object or array.

  if(todos && todos.length>0){
    setTodos(todos);
  }
},[]) 

useEffect(()=>{                //JSON.stringify(todos) converts the todos array into a JSON string.
  localStorage.setItem('todos',JSON.stringify(todos));
},[todos])                    //setItem() is used to store the todos data in the browser's localStorage and it takes two values ("key","string")

console.log(todos);


  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#f2fb51] rounded-xl min-h-[500px] py-8">
                <div className="w-full max-w-2xl mx-auto shadow-orange-800 shadow-xl rounded-lg px-4 py-3 text-orange-500">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                      
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                       {todos.map((todo)=>
                       <div key={todo.id}
                       className='w-full'
                       >
                         <TodoItem todo={todo}/>
                      </div>
                        )}
                    </div>
                </div>
            </div>

    
    </TodoProvider>
  )
}

export default App
