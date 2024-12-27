// Inicializando o EmailJS
emailjs.init("YOUR_USER_ID"); // Substitua YOUR_USER_ID com seu ID do EmailJS

// Função para gerar e enviar o recibo
document.getElementById('recibo-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Coletando os dados do formulário
    const valor = document.getElementById('valor').value;
    const valorExtenso = document.getElementById('valorExtenso').value;
    const referente = document.getElementById('referente').value;
    const nomePagador = document.getElementById('nomePagador').value;
    const cpfPagador = document.getElementById('cpfPagador').value;
    const cheque = document.getElementById('cheque').value;
    const banco = document.getElementById('banco').value;
    const agencia = document.getElementById('agencia').value;
    const local = document.getElementById('local').value;
    const nomeEmitente = document.getElementById('nomeEmitente').value;
    const cpfEmitente = document.getElementById('cpfEmitente').value;
    const rgEmitente = document.getElementById('rgEmitente').value;
    const email = document.getElementById('email').value;

    // Gerar o recibo em PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título do recibo
    doc.setFontSize(16);
    doc.text("RECIBO", 105, 20, null, null, 'center'); // Centraliza o título
    
    // Preencher os dados no formato solicitado
    doc.setFontSize(12);
    doc.text(`Recibo R$ ${valor}`, 20, 40);
    doc.text(`Recebemos de ${nomePagador} - CPF/CNPJ ${cpfPagador}, a importância supra de: ${valorExtenso} - referente a: ${referente}.`, 20, 50);
    doc.text(`E, para maior clareza, firmo o presente recibo para que produza os seus efeitos, dando plena, rasa e irrevogável quitação, pelo valor recebido.`, 20, 60);
    doc.text(`Pagamento efetuado em dinheiro.`, 20, 70);
    doc.text(`Dia ${new Date().getDate()} de ${new Date().toLocaleString('default', { month: 'long' })} de ${new Date().getFullYear()}`, 20, 80);
    doc.text(`RG/IE n° ${rgEmitente}`, 20, 90);
    doc.text(`CPF/CNPJ n° ${cpfEmitente}`, 20, 100);

    // Botões para Imprimir e Fechar (isso é feito na parte do HTML, mas menciono aqui)
    doc.text("Clique no botão para imprimir ou fechar a página.", 20, 110);

    // Salvar o PDF em uma URL
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank'); // Abre em uma nova aba para visualização

    // Enviar o PDF por e-mail
    const templateParams = {
        to_email: email,
        subject: "Recibo Gerado",
        message: "Segue o recibo gerado em PDF.",
        attachment: doc.output('datauristring') // Envia o PDF como anexo
    };

    // Enviar o e-mail com o recibo anexado
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(response => {
            console.log('E-mail enviado com sucesso!', response);
            alert("O recibo foi enviado para o seu e-mail.");
        }, error => {
            console.error('Erro ao enviar o e-mail', error);
            alert("Erro ao enviar o e-mail.");
        });
});
