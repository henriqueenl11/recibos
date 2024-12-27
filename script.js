// Inicializando o EmailJS
emailjs.init("qI4LCXqDkmxT1FBEs"); // Substitua YOUR_USER_ID com seu ID do EmailJS

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
    
    doc.text("Recibo de Pagamento", 20, 10);
    doc.text(`Valor: R$ ${valor}`, 20, 20);
    doc.text(`Valor por extenso: ${valorExtenso}`, 20, 30);
    doc.text(`Referente: ${referente}`, 20, 40);
    doc.text(`Nome do Pagador: ${nomePagador}`, 20, 50);
    doc.text(`CPF/CNPJ do Pagador: ${cpfPagador}`, 20, 60);
    doc.text(`Cheque N°: ${cheque}`, 20, 70);
    doc.text(`Banco: ${banco}`, 20, 80);
    doc.text(`Agência: ${agencia}`, 20, 90);
    doc.text(`Local: ${local}`, 20, 100);
    doc.text(`Nome do Emitente: ${nomeEmitente}`, 20, 110);
    doc.text(`CPF/CNPJ do Emitente: ${cpfEmitente}`, 20, 120);
    doc.text(`RG do Emitente: ${rgEmitente}`, 20, 130);
    
    // Salvar ou abrir o PDF gerado
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank'); // Abre em uma nova aba

    // Enviar o PDF por e-mail
    const templateParams = {
        to_email: email,
        subject: "Recibo Gerado",
        message: "Segue o recibo gerado em PDF.",
        attachment: doc.output('datauristring') // Envia o PDF como anexo
    };

    // Enviar o e-mail com o recibo anexado
    emailjs.send('service_km1w0fm', 'template_da6wae6', templateParams)
        .then(response => {
            console.log('E-mail enviado com sucesso!', response);
            alert("O recibo foi enviado para o seu e-mail.");
        }, error => {
            console.error('Erro ao enviar o e-mail', error);
            alert("Erro ao enviar o e-mail.");
        });
});
