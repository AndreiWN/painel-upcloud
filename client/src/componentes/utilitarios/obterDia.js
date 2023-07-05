// Função para obter o dia da semana a partir de uma data
export function obterDiaDaSemana(dataString) {
    var partes = dataString.split('/'); // Dividir a string da data em partes (dia, mês, ano)
    var dia = parseInt(partes[0], 10); // Converter o dia para um número inteiro
    var mes = parseInt(partes[1], 10) - 1; // Converter o mês para um número inteiro (subtraindo 1, pois os meses em JavaScript começam em 0)
    var ano = parseInt(partes[2], 10); // Converter o ano para um número inteiro

    var data = new Date(ano, mes, dia); // Criar um objeto Date com a data fornecida
    var diaSemana = data.getDay(); // Obter o dia da semana (0 = Domingo, 1 = Segunda-feira, ..., 6 = Sábado)

    var nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return nomesDias[diaSemana]; // Retornar o nome do dia da semana correspondente
}