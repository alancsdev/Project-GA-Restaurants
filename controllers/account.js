const User = require('../models/user');

module.exports = {
  index,
  logout,
  create,
};

async function index(req, res) {
  res.render('account/index', { user: req.user });
}

async function logout(req, res) {
  res.render('/logout');
}

async function create(req, res) {
  console.log(req.params);
  try {
    // Encontre o usuário com base no ID fornecido nos parâmetros da requisição
    const user = await User.findById(req.params.id);

    // Atualize os dados do usuário com base nos dados fornecidos no corpo da requisição
    // (certifique-se de que req.body contenha os campos corretos para atualizar)
    user.address = req.body.address; // Exemplo: assumindo que você tem um campo 'address' no corpo da requisição

    // Salve as alterações no banco de dados
    await user.save();

    // Redirecione o usuário para a rota '/oi/' após a conclusão
    res.redirect('/oi/');
  } catch (error) {
    // Se ocorrer um erro, responda com um status de erro e uma mensagem de erro adequada
    console.error('Erro ao salvar o endereço:', error);
    res
      .status(500)
      .send(
        'Erro ao salvar o endereço. Por favor, tente novamente mais tarde.'
      );
  }
}
