const themeStorageKey = 'tema';
const fontStorageKey = 'fonte';

function alternarTema() {
  document.body.classList.toggle('dark');
  const modo = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem(themeStorageKey, modo);
}

function alternarFonte() {
  document.body.classList.toggle('fonte-grande');
  const tamanho = document.body.classList.contains('fonte-grande') ? 'grande' : 'normal';
  localStorage.setItem(fontStorageKey, tamanho);
}

function aplicarPreferencias() {
  if (localStorage.getItem(themeStorageKey) === 'dark') {
    document.body.classList.add('dark');
  }
  if (localStorage.getItem(fontStorageKey) === 'grande') {
    document.body.classList.add('fonte-grande');
  }
}

function enviarFormulario(event) {
  event.preventDefault();
  alert('Página em construção');
}

function inicializarControles() {
  const temaBtn = document.getElementById('botao-tema');
  const fonteBtn = document.getElementById('botao-fonte');
  const contatoForm = document.getElementById('contato-form');

  if (temaBtn) temaBtn.addEventListener('click', alternarTema);
  if (fonteBtn) fonteBtn.addEventListener('click', alternarFonte);
  if (contatoForm) contatoForm.addEventListener('submit', enviarFormulario);
}

document.addEventListener('DOMContentLoaded', () => {
  aplicarPreferencias();
  inicializarControles();
});
