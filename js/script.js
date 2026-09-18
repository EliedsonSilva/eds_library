document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PROTEÇÃO DO ÁUDIO (Anti-download)
    // ==========================================
    const audioElement = document.getElementById('meuAudio');
    
    // Desativa o clique com botão direito especificamente no player de áudio
    audioElement.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });


    // ==========================================
    // 2. LÓGICA DO SISTEMA DE FEEDBACKS
    // ==========================================
    const feedbackForm = document.getElementById('feedbackForm');
    const commentsList = document.getElementById('commentsList');
    const commentCount = document.getElementById('commentCount');

    // Carregar comentários ao iniciar a página
    carregarComentarios();

    // Evento de envio do formulário
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede a página de recarregar

        // Pega os valores digitados
        const nome = document.getElementById('nome').value.trim();
        const comentario = document.getElementById('comentario').value.trim();

        if (nome === '' || comentario === '') return;

        // Cria o objeto do novo comentário
        const novoFeedback = {
            id: Date.now(),
            nome: nome,
            texto: comentario,
            data: new Date().toLocaleDateString('pt-BR')
        };

        // Salva e atualiza a tela
        salvarComentario(novoFeedback);
        adicionarComentarioNaTela(novoFeedback);
        
        // Limpa o formulário
        feedbackForm.reset();
    });

    // Função para salvar no localStorage (Simula o banco de dados)
    function salvarComentario(comentario) {
        let comentarios = JSON.parse(localStorage.getItem('eds_library_feedbacks')) || [];
        comentarios.unshift(comentario); // Adiciona no início da lista
        localStorage.setItem('eds_library_feedbacks', JSON.stringify(comentarios));
        atualizarContador();
    }

    // Função para buscar e exibir comentários salvos
    function carregarComentarios() {
        let comentarios = JSON.parse(localStorage.getItem('eds_library_feedbacks')) || [];
        commentsList.innerHTML = ''; // Limpa a lista antes de carregar
        
        if (comentarios.length === 0) {
            commentsList.innerHTML = '<p style="color: #aaa;">Nenhum feedback ainda. Seja o primeiro!</p>';
        } else {
            comentarios.forEach(comentario => adicionarComentarioNaTela(comentario));
        }
        atualizarContador();
    }

    // Cria o visual do comentário no HTML
    function adicionarComentarioNaTela(comentario) {
        // Remove a mensagem de "nenhum feedback" se for o primeiro
        if (commentsList.innerHTML.includes('Nenhum feedback ainda')) {
            commentsList.innerHTML = '';
        }

        const div = document.createElement('div');
        div.classList.add('comment-card');
        
        div.innerHTML = `
            <div class="comment-header">
                <span class="comment-name">${comentario.nome}</span>
                <span class="comment-date">${comentario.data}</span>
            </div>
            <div class="comment-body">
                ${comentario.texto}
            </div>
        `;
        
        // Adiciona no topo da lista visual
        commentsList.prepend(div);
    }

    function atualizarContador() {
        let comentarios = JSON.parse(localStorage.getItem('eds_library_feedbacks')) || [];
        commentCount.textContent = comentarios.length;
    }
});