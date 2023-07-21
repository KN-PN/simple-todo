import { FormEvent, useState } from 'react'
import './App.css'

const todoStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '3px',
  padding: '.em',
  marginBottom: '.5em',
  display: 'flex',
  flex: 1,
  justifyContent: 'center'
}

const inputTodo: React.CSSProperties = {
  flex: 1
}

const todoDoneStyle: React.CSSProperties = {
  textDecoration: 'line-through',
  textDecorationThickness: '15%',
  color: '#949494'
}

const todoButtonStyle: React.CSSProperties = {
  flexGrow: 1,
}

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#803335'
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  margin: '1em 0'
}

interface todoData {
  id: number;
  title: string;
  status: boolean;
  createdOn: Date;
  modifiedOn: Date;
  modifiedType: modifiedType;
}

enum modifiedType {
  done = "DONE",
  undo = "UNDO",
  delete = "DEL"
}


const todoBoard: React.CSSProperties = {

  margin: '2em 0',
  backgroundColor: '#383838',
  padding: '2em 1em',
  borderRadius: '3px',
  minWidth: '350px'
}


function App() {
  const [todoList, setTodoList] = useState<todoData[]>([])

  const [todo, setTodo] = useState<string>('')


  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!todo) return;

    const updatedTodoList = [
      ...todoList,
      {
        id: todoList.length + 1,
        title: todo,
        status: false,
        createdOn: new Date()
      } as todoData
    ]

    setTodoList(updatedTodoList)
    setTodo('')
  }


  const todoClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();

    setTodoList((prev) => {
      return prev.map((todo) => todo.id === id ? {
        ...todo,
        status: !todo.status,
        modifiedOn: new Date(),
        modifiedType: todo.status === false ? modifiedType.done : modifiedType.undo
      } as todoData
        : todo)
    })

  }


  const deleteTodo = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();
    setTodoList((prev) => {
      return prev.map((todo) => todo.id === id ? {
        ...todo,
        modifiedOn: new Date(),
        modifiedType: modifiedType.delete
      } as todoData
        : todo)
    })

  }


  const todos = todoList.filter((todo) => todo.modifiedType !== modifiedType.done && todo.modifiedType !== modifiedType.delete)
  const todoDones = todoList.filter((todo) => todo.modifiedType === modifiedType.done)


  return (
    <>
      <h1>Todo</h1>

      <form onSubmit={handleFormSubmit} style={formStyle}>

        <input
          type="text"
          style={inputTodo}
          value={todo}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTodo(event.target.value) }} />
        <button>Add</button>

      </form>

      {
        todos.length > 0 ?
          (

            <div style={todoBoard}>
              {
                todos
                  .map((todo) => {

                    const todoStlye: React.CSSProperties = todo.status ? { ...todoButtonStyle, ...todoDoneStyle } : todoButtonStyle
                    const title: string = [
                      `Created On: ${todo.createdOn.toLocaleDateString()} ${todo.createdOn.toLocaleTimeString()}`,
                      todo.modifiedType ? `Modified Type: ${todo.modifiedType}` : null,
                      todo.modifiedType ? `Modified On: ${todo.modifiedOn?.toLocaleDateString()} ${todo.modifiedOn?.toLocaleTimeString()}` : null,
                    ].join('\n');

                    return (
                      <div style={todoStyle} key={todo.id} title={title}>
                        <button style={todoStlye} onClick={(e) => todoClick(e, todo.id)}>{todo.title}</button>
                        <button style={deleteButtonStyle} onClick={(e) => deleteTodo(e, todo.id)}>X</button>
                      </div>
                    )
                  })}
            </div>
          )
          : null
      }


      {
        todoDones.length > 0 ?
          (
            <div style={todoBoard}>
              {
                todoDones
                  .map((todo) => {

                    const todoStlye: React.CSSProperties = todo.status ? { ...todoButtonStyle, ...todoDoneStyle } : todoButtonStyle;

                    const title: string = [
                      `Created On: ${todo.createdOn.toLocaleDateString()} ${todo.createdOn.toLocaleTimeString()}`,
                      todo.modifiedType ? `Modified Type: ${todo.modifiedType}` : null,
                      todo.modifiedType ? `Modified On: ${todo.modifiedOn?.toLocaleDateString()} ${todo.modifiedOn?.toLocaleTimeString()}` : null,
                    ].join('\n');

                    return (
                      <div style={todoStyle} key={todo.id} title={title}>
                        <button style={todoStlye} onClick={(e) => todoClick(e, todo.id)}>{todo.title}</button>
                        <button style={deleteButtonStyle} onClick={(e) => deleteTodo(e, todo.id)}>X</button>
                      </div>
                    )
                  })}
            </div>

          )
          : null
      }


    </>
  )
}

export default App
