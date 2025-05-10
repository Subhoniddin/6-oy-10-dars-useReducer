async function getData(skip, limit) {
    const req = await fetch(`https://json-api.uz/api/project/fn37/todos?skip=${skip}&limit=${limit}`)
    
    if (req.status === 200) {
        const res = await req.json()
        return res
        
        
    } else {
        throw new Error('nimadir xato')
    }
} 

async function postData(postD) {
   const req = await fetch('https://json-api.uz/api/project/fn37/todos', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(postD)
      })
    
    if (req.status === 200) {
        const res = await req.json()
        return res
        
    } else {
        throw new Error('nimadir xato')
    }
} 

async function deleteList(id) {
   const req = await fetch(`https://json-api.uz/api/project/fn37/todos/${id}`, {
        method: 'DELETE',
      })
    
    if (req.status === 200) {
        return id
    } else {
        throw new Error('nimadir xato')
    }
} 


export {getData, postData, deleteList}