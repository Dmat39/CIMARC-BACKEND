const admin = (req, res) => {
    res.send('Mis Documentos');
};

const subirdoc = (req, res) => {
    res.send('Subir Documento');
};
  
module.exports = {
    admin,
    subirdoc
};