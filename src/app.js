import express from "express";
import db from './utils/database.js';
import User from "./models/users.model.js";
import "dotenv/config";

User;

const PORT = process.env.PORT ?? 8000;

db.authenticate()
  .then(() => {console.log('conexion correcta')})
  .catch(error => console.log(error))
db.sync()
  .then(() => console.log('base de datos sincronizada'))
  .catch(error => console.log(error))

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("OK");
});

app.post('/users', async (req, res) => {
    try {
        const { body } =req;
    
        const user = await User.create(body);
        res.status(201).json(user);
        
    } catch (error) {
        res.status(400).json(error)
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        res.json(user)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const user = await User.update(body, {
            where: { id }
        });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      await User.destroy({
        where: {id}
      });
      res.status(204).end() // termina con la petición
    } catch (error) {
       res.status(400).json(error);
      }
})

app.listen(PORT, () => {
    console.log(`servidor escuchado en el puerto ${PORT}`)
});