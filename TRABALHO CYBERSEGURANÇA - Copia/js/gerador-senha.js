const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function gerarSenha() {
  const includeUpper = document.getElementById('check-maiusculas').checked;
  const includeNumbers = document.getElementById('check-numeros').checked;
  const includeSpecial = document.getElementById('check-especiais').checked;
  const tamanho = parseInt(document.getElementById('slider-tamanho').value, 10);

  const conjuntos = [lowerCaseChars];
  if (includeUpper) conjuntos.push(upperCaseChars);
  if (includeNumbers) conjuntos.push(numberChars);
  if (includeSpecial) conjuntos.push(specialChars);

  const todosCaracteres = conjuntos.join('');
  let senha = '';

  conjuntos.forEach((conjunto) => {
    senha += conjunto[Math.floor(Math.random() * conjunto.length)];
  });

  for (let i = senha.length; i < tamanho; i++) {
    senha += todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)];
  }

  senha = senha.split('').sort(() => 0.5 - Math.random()).join('');
  const senhaExibida = document.getElementById('senha-gerada');
  senhaExibida.textContent = senha;
  senhaExibida.setAttribute('aria-label', `Senha gerada: ${senha}`);

  atualizarForca(senha);
}

function atualizarForca(senha) {
  const criterios = [
    senha.length >= 8,
    senha.length >= 12,
    /[A-Z]/.test(senha) && /[a-z]/.test(senha),
    /[0-9]/.test(senha),
    /[^A-Za-z0-9]/.test(senha),
  ];

  const pontos = Math.min(criterios.filter(Boolean).length, 4);
  const textos = ['Muito fraca', 'Fraca', 'Razoável', 'Forte', 'Muito forte'];
  const cores = ['#e74c3c', '#e74c3c', '#f39c12', '#27ae60', '#1abc9c'];
  const larguras = ['15%', '30%', '55%', '80%', '100%'];

  document.getElementById('texto-forca').textContent = textos[pontos];
  const barra = document.getElementById('barra-forca');
  barra.style.width = larguras[pontos];
  barra.style.background = cores[pontos];
}

function atualizarTamanho() {
  document.getElementById('valor-tamanho').textContent =
    document.getElementById('slider-tamanho').value;
}

function copiarSenha() {
  const senhaExibida = document.getElementById('senha-gerada').textContent.trim();
  const feedback = document.getElementById('feedback-copiar');

  if (!senhaExibida || senhaExibida === 'Clique em "Gerar Senha"') {
    feedback.textContent = 'Gere uma senha antes de copiar.';
    feedback.classList.add('falha');
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(senhaExibida)
      .then(() => {
        feedback.textContent = 'Senha copiada para a área de transferência!';
        feedback.classList.remove('falha');
      })
      .catch(() => {
        feedback.textContent = 'Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.';
        feedback.classList.add('falha');
      });
  } else {
    feedback.textContent = 'Copie a senha manualmente do campo acima.';
    feedback.classList.add('falha');
  }
}

function inicializarGerador() {
  const slider = document.getElementById('slider-tamanho');
  const gerarBtn = document.getElementById('botao-gerar-senha');
  const copiarBtn = document.getElementById('copiar-senha');

  if (slider) {
    slider.addEventListener('input', atualizarTamanho);
    atualizarTamanho();
  }

  if (gerarBtn) {
    gerarBtn.addEventListener('click', gerarSenha);
  }

  if (copiarBtn) {
    copiarBtn.addEventListener('click', copiarSenha);
  }
}

document.addEventListener('DOMContentLoaded', inicializarGerador);
