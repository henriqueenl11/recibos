document.getElementById('recibo-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const valor = document.getElementById('valor').value;
    const valorExtenso = document.getElementById('valorExtenso').value;
    const referente = document.getElementById('referente').value || "N/A";
    const nomePagador = document.getElementById('nomePagador').value;
    const cpfPagador = document.getElementById('cpfPagador').value;
    const cheque = document.getElementById('cheque').value || "N/A";
    const banco = document.getElementById('banco').value || "N/A";
    const agencia = document.getElementById('agencia').value || "N/A";
    const local = document.getElementById('local').value;
    const nomeEmitente = document.getElementById('nomeEmitente').value;
    const cpfEmitente = document.getElementById('cpfEmitente').value;
    const rgEmitente = document.getElementById('rgEmitente').value;
  
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
  
    pdf.setFontSize(16);
    pdf.text("R E C I B O", 105, 20, { align: "center" });
  
    pdf.setFontSize(12);
    pdf.text(`Recibo R$ ${valor}`, 20, 40);
    pdf.text(`Recebi(emos) de ${nomePagador} - CPF/CNPJ n° ${cpfPagador},`, 20, 50);
    pdf.text(`a importância supra de: ${valorExtenso} - referente a: ${referente}.`, 20, 60);
  
    if (cheque !== "N/A") {
      pdf.text(`Pagamento efetuado através do cheque n°: ${cheque}`, 20, 80);
      pdf.text(`do Banco: ${banco} Agência: ${agencia}.`, 20, 90);
    }
  
    pdf.text(
      `${local.toUpperCase()}, ${new Date().toLocaleDateString("pt-BR")}`,
      20,
      110
    );
    pdf.text(`${nomeEmitente}`, 20, 130);
    pdf.text(`RG/IE n° ${rgEmitente}`, 20, 140);
    pdf.text(`CPF/CNPJ n° ${cpfEmitente}`, 20, 150);
  
    pdf.save("recibo.pdf");
  });
  