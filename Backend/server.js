const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

const layoutFile = './layout.json';

// Carregar layout do arquivo
app.get('/api/load-layout', (req, res) => {
  fs.readFile(layoutFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao carregar layout' });
    }
    res.json(JSON.parse(data));
  });
});

// Salvar layout no arquivo
app.post('/api/save-layout', (req, res) => {
  const layout = req.body;
  fs.writeFile(layoutFile, JSON.stringify(layout), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao salvar layout' });
    }
    res.json({ message: 'Layout salvo com sucesso' });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
