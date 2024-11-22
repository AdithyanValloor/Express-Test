import express from 'express'

const app = express()
const port = 8000

app.use(express.json())

let meData = []
let meId = 1


// ADD
app.post('/data',(req,res)=>{

    const {name, age} =  req.body
    const newData = {id: meId++, name, age}
    meData.push(newData)

    res.status(201).send(newData)

})

// get Data with id  
app.get('/data/:id',(req,res)=>{

    const newMe = meData.find((me)=> me.id === parseInt(req.params.id) )
    
    if (!newMe) {
        res.status(404).send('Data not found')
    }else{
        res.status(200).send(newMe)
    }
})

// get all data
app.get('/data',(req,res)=>{

    res.status(200).send(meData)
    console.log(meData);
    
})

// Home server
app.get('/', (req,res)=>{
    res.status(200).send('This is my server')
})

// Update
app.put('/data/:id',(req,res)=>{
    const newMe = meData.find((me)=> me.id === parseInt(req.params.id))
    if (!newMe) {
        res.status(404).send('Data not found')
    }
    const {name, age} = req.body
    newMe.name = name 
    newMe.age = age 
    res.status(200).send(newMe)
})

// Delete
app.delete('/data/:id',(req,res)=>{
    const index = meData.findIndex(me => me.id === parseInt(req.params.id))
    if (index === -1) {
       return res.status(200).send('Data not found')
    }
    meData.splice(index, 1)
    res.status(200).send(meData)
})

app.listen(port, ()=>{
    console.log(`Server is running at: ${port}`);
})