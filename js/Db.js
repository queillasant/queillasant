Db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            console.log('persistance failed');
        } else if (err.code == 'unimplemented') {
            console.log('persistance not available');
        }
    });

Db.collection('Produtos').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            renderRecipe(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
        }
    });
});

// adicionar um novo produto
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const Produtos = {
        nome: form.produtoTitulo.value,
        descricao: form.produtoDescricao.value,
        link: form.produtoLink.value,
        endereco_imagem: form.produtoArquivo.value
    };

    Db.collection('Produtos').add(produto)
        .catch(err => console.log(err));

    //reseta o formulario
    form.produtoTitulo.value = '';
    form.produtoDescricao.value = '';
    form.produtoLink.value = '';
    form.produtoArquivo.value = '';

});

