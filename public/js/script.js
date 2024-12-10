document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnFuncionarios').addEventListener('click', function () {
    fetchData('/dados/funcionarios');
  });

  document.getElementById('btnClientes').addEventListener('click', function () {
    fetchData('/dados/clientes');
  });

  document.getElementById('btnLivros').addEventListener('click', function () {
    fetchData('/dados/livros');
  });

  document.getElementById('btnEmprestimos').addEventListener('click', function () {
    fetchData('/dados/emprestimos');
  });

  document.getElementById('btnReservas').addEventListener('click', function () {
    fetchData('/dados/reservas');
  });

  document.getElementById('btnDevolucoes').addEventListener('click', function () {
    fetchData('dados/devolucoes');
  })
});

function fetchData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let resultadoDiv = document.getElementById('resultado');
      resultadoDiv.innerHTML = '<h2>Dados:</h2>';
      
      if (data.length === 0) {
        resultadoDiv.innerHTML += '<p>Nenhum dado encontrado.</p>';
      } else {
        let table = '<table id="tabelaDados" border="1"><thead><tr>';
        
        // Cabeçalhos das colunas
        for (let key in data[0]) {
          // Não adicionar funcionalidade de ordenação para a coluna "Senha"
          if (key === 'Senha') {
            table += `<th>${key}</th>`;
          } else {
            table += `<th onclick="sortTable('${key}')">${key}</th>`;
          }
        }
        table += '</tr></thead><tbody>';
        
        // Linhas da tabela
        data.forEach(row => {
          table += '<tr>';
          for (let key in row) {
            table += `<td>${row[key]}</td>`;
          }
          table += '</tr>';
        });

        table += '</tbody></table>';
        resultadoDiv.innerHTML += table;
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os dados:', error);
      document.getElementById('resultado').innerHTML = '<p>Erro ao carregar os dados.</p>';
    });
}

let currentSort = {
  column: null,
  direction: 'desc' // Inicialmente em ordem decrescente
};

function sortTable(column) {
  const table = document.getElementById('tabelaDados');
  const rows = Array.from(table.rows).slice(1); // Ignora o cabeçalho da tabela

  // Ignora a coluna "Senha" e evita ordenação nela
  if (column === 'Senha') return;

  // Verifica a direção da ordenação
  let direction = currentSort.direction === 'desc' ? 1 : -1;

  // Função para comparar as células de forma alfanumérica
  const compare = (aText, bText) => {
    // Caso os textos sejam números, converte para número para comparação
    const aNum = parseFloat(aText);
    const bNum = parseFloat(bText);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      // Se ambos são números, compara numericamente
      return aNum - bNum;
    }
    
    // Caso contrário, compara alfabeticamente
    return aText.localeCompare(bText, undefined, { sensitivity: 'base' });
  };

  // Ordena as linhas com base na comparação alfanumérica
  rows.sort((a, b) => {
    const aText = a.cells[Object.keys(a.cells).find(key => table.rows[0].cells[key].innerText === column)].innerText;
    const bText = b.cells[Object.keys(b.cells).find(key => table.rows[0].cells[key].innerText === column)].innerText;

    return direction * compare(aText, bText);
  });

  // Reverte a direção para a próxima vez que a coluna for clicada
  currentSort.direction = currentSort.direction === 'desc' ? 'asc' : 'desc';

  // Reorganiza as linhas na tabela
  rows.forEach(row => table.appendChild(row));
}