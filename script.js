(() => {
  // state variables
  let toDoListArray = [];
  // ui variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const dateInput = form.querySelector("#date");
  const columns = document.querySelectorAll(".toDoList");

  // event listeners
  form.addEventListener('submit', e => {
    e.preventDefault();
    let itemId = String(Date.now());
    let toDoItem = input.value;
    let dueDate = dateInput.value;
    addItemToDOM(itemId, toDoItem, dueDate);
    addItemToArray(itemId, toDoItem, dueDate);
    input.value = '';
    dateInput.value = '';
  });

  columns.forEach(column => {
    column.addEventListener('click', e => {
      if (e.target.classList.contains('edit-button')) {
        let id = e.target.getAttribute('data-id');
        editItem(id);
      } else if (e.target.classList.contains('delete-button')) {
        let id = e.target.getAttribute('data-id');
        removeItemFromDOM(id);
        removeItemFromArray(id);
      } else if (e.target.classList.contains('checkbox')) {
        let id = e.target.getAttribute('data-id');
        toggleCompleteItem(id);
      }
    });
  });

  // functions
  function addItemToDOM(itemId, toDoItem, dueDate) {
    const li = document.createElement('li');
    li.setAttribute("data-id", itemId);
    li.innerHTML = `
      <input type="checkbox" class="checkbox" data-id="${itemId}">
      <span>${toDoItem}</span>
      <span class="date">Due: ${dueDate}</span>
      <div>
        <button class="edit-button" data-id="${itemId}">Edit</button>
        <button class="delete-button" data-id="${itemId}">Delete</button>
      </div>
    `;
    const columnId = getColumnId(dueDate);
    document.querySelector(`#${columnId} .toDoList`).appendChild(li);
  }

  function getColumnId(dueDate) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    const dayAfter = new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0];
    
    if (dueDate === today) return 'today';
    if (dueDate === tomorrow) return 'tomorrow';
    if (dueDate === dayAfter) return 'day-after';
    return 'today'; // default to today's tasks
  }

  function addItemToArray(itemId, toDoItem, dueDate) {
    toDoListArray.push({ itemId, toDoItem, dueDate, completed: false });
    console.log(toDoListArray);
  }

  function removeItemFromDOM(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    li.parentElement.removeChild(li);
  }

  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
  }

  function editItem(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    const span = li.querySelector('span');
    const newItem = prompt('Edit your item:', span.textContent);
    if (newItem !== null) {
      span.textContent = newItem;
      toDoListArray = toDoListArray.map(item => 
        item.itemId === id ? { ...item, toDoItem: newItem } : item
      );
      console.log(toDoListArray);
    }
  }

  function toggleCompleteItem(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    const item = toDoListArray.find(item => item.itemId === id);
    item.completed = !item.completed;
    li.classList.toggle('completed');
    console.log(toDoListArray);
  }
})();
