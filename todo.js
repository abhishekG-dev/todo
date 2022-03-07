
// todo all functionalities


let todos = []

let archieved = []

const form = document.forms.todo_input
const input = form.elements.todo

const container = document.querySelector('.todo_container')
const main = document.querySelector('.todo_list_container')
const root = document.querySelector('.todo_list')
const list = root.querySelector('.todo_main_list')
const count = main.querySelector('.todo_count')
const no_task = list.querySelector('.no_task')
const clear = main.querySelector('.clear')
const All = main.querySelector('.all_todos')
const Active = main.querySelector('.active_todos')
const Completed = main.querySelector('.completed_todos')

// for mobile view
const all = container.querySelector('.all_m_todos')
const active = container.querySelector('.active_m_todos')
const  completed = container.querySelector('.completed_m_todos')

console.log(no_task.style.display)


const renderTodo = (todos) =>{
    let items = ""
    todos.map((todo, index) => {
        items += `<li data-id =${index} class="todo_item">
         <input type="checkbox" class="todo_check" 
         ${todo.complete? ' checked': ''} ${todo.disabled? 'disabled' : ''}/>
         <span class="todo_label" ${todo.complete && !todo.disabled ? ' style="text-decoration:line-through;color:hsl(236, 8%, 61%);"' : '' } >${todo.label}</span>
         <button type="button" class="cross_btn"><img src="./image/icon-cross.svg"  style= "display:${todo.disabled? 'none' : ''}" alt=""></img>
         </button>
         </li>`
    })
    list.innerHTML = items
    count.innerHTML = todos.filter(todo=> !todo.complete).length
    no_task.style.display = todos.length===0 ? 'block' : 'none' 
    
}

const addTodo = (e) =>{
    e.preventDefault()
    const label = input.value.trim()
    const complete = false;
    const disabled = false;
    if(label === "")return
    todos = [
       ...todos,
        {
               label,
               complete,
               disabled
        }
    ]
    // console.log(todos) //------------
    renderTodo(todos)
    input.value = ""

}

const updateTodo = (e) =>{
    const id = parseInt( e.target.parentNode.getAttribute('data-id') ,10)
    const complete = e.target.checked
    todos = todos.map((todo,index)=>{
        if(index === id){
            return { 
                ...todo,
                complete
            }
        }
        return todo
    })

    renderTodo(todos)
}


const deleteTodo = (e) =>{
    if(e.target.nodeName.toLowerCase() !== 'img')return;
    const id = parseInt(e.target.parentNode.parentNode.getAttribute('data-id'), 10)
    const label = e.target.parentNode.previousElementSibling.innerHTML
    if(window.confirm(`Delete ${label} ?`)){
    const deletedItem = todos.filter((todo, index) => index == id)
    .map(todo=>{
        return{
            ...todo,
            complete : true,
            disabled : true
        }
    })
    archieved = [...archieved,...deletedItem]
    todos = todos.filter((todo,index)=> index !== id)
    renderTodo(todos)
    // console.log(todos)  //------------
    // console.log(archieved)
    }
}


const clearAllTodo = (e) => {
    const total = todos.filter(todo=> todo.complete).length
    if(total === 0)return;
    if(window.confirm(`Delete ${total} task ?`)){
        archieved = [...archieved, ...todos.filter(todo => todo.complete)
        .map(todo=>{
            return {
                ...todo,
                disabled : true
            }
        })]
        todos = todos.filter(todo => !todo.complete)
        renderTodo(todos)
        // console.log(archieved)  //--------
    }

}


const showTodo = () =>{
    const allTodos = [...todos,...archieved]
    renderTodo(allTodos)
}

// const showActive = () =>{
//     renderTodo(todo)
// }




const inti = () =>{
    
    // renderTodo(todos)

    form.addEventListener('submit',addTodo)

    list.addEventListener('change',updateTodo)

    list.addEventListener('click', deleteTodo)

    clear.addEventListener('click', clearAllTodo)

    All.addEventListener('click', showTodo)

    Active.addEventListener('click',()=>{renderTodo(todos)})

    Completed.addEventListener('click',()=>{renderTodo(archieved)})
    
    all.addEventListener('click', showTodo)

    active.addEventListener('click',()=>{renderTodo(todos)})

    completed.addEventListener('click',()=>{renderTodo(archieved)})


}


inti()  
