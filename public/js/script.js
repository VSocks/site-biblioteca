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
          let table = '<table border="1"><thead><tr>';
          for (let key in data[0]) {
            table += `<th>${key}</th>`;
          }
          table += '</tr></thead><tbody>';
          
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