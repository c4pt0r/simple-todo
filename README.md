# My TodoMVC

Let's create a simplae Todo application with TS and React.

## How To

### 1. Use `create-react-app` to init the project


```
npx create-react-app my-todo-mvc --template typescript
```

Then, you'll get the initial project and the initial git commitment.

### 2. Render the header and footer

- Modify the `src/App.tsx` to render the **header**, **main** and **footer**
- Implement **header** and **footer**
- Remember modify the corresponding style. **To simplify the style, we write the style of the whole app into the `APP.css` file.**

### 3. Render tasks

- Create the model for the tasks(using react hooks)
- Fill the mock data for the model
- Render the tasks in the **main** area of the App

### 4. Add/Remove/Update/Toggle

- Add task
- Remove task
- Edit task
- Toggle task

### 5. API

- Read [API Spec](#api-spec)
- Use `axios` as http client to request api
- Use `react-toastify` for toast
- Add api for add/remove/update/toggle task

### 6. Count & Filter

- Add task count
- Add status filter
- Add a transparent mask onto the app (ban interaction) when the list is loading

## API SPEC

### Response Convention

- If the api cannot be available, return 5xx http code. 
- If the api can be accessed, return the http code as **200** with response struct below:

```json
{
  // c for 'code'，type is int
  // 0 for normal, not-zero for business exception
  c: 0,
  // d for 'data'(ayload), any json is valid
  d: "",
  // m for 'message', the description for business exception
  m: ""
}
```

### GET /todos

#### Params
name | default | required | note
---------|----------|---------|---------
 limit | 100 | false | Specifies the maximum number of entries to return.(Maximum: 100)
 statusFilter | 1 | false | Numerical enum, 1 for 'all', 2 for 'uncompleted', 3 for 'completed'.

#### Response
```json
{
  c: 0,
  m: "",
  // if no data, d is []
  d: [
    {
      id: "<todo_id>",
      title: "<todo_title>",
      completed: false
    },
    ... ...
  ]
}
```

### POST /todo

#### RequestBody
```json
{
  title: "todo title"
}
```

#### Response
```json
{
  c: 0,
  m: "",
  // response with the todo entity
  d: {
    id: "<todo_id>",
    title: "todo title",
    completed: false
  }
}
```


### DELETE /todo

#### RequestBody
```json
{
  id: "<todo_id>"
}
```

#### Response
```json
{
  c: 0,
  m: "",
  d: ""
}
```

### PATCH /todo

#### RequestBody
```json
{
  // required
  id: "<todo_id>",
  // optional, to update title
  title: "<updated_todo_title>",
  // optional, to toggle status
  completed: true
}
```

#### Response
```json
{
  c: 0,
  m: "",
  // response with the updated todo entity
  d: {
    id: "<todo_id>",
    title: "todo title",
    completed: true
  }
}
```


