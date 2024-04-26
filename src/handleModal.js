const popModal = () => {
  const projectModal = {
    inputsContainer: document.getElementById('projectInputsContainer'),
    divInputsModal: document.getElementById('projectInputsModal'),
    divOverlay: document.getElementById('overlay'),
    closeBtn: document.getElementById('projectCloseModal'),
    submitInputs: document.getElementById('projectSubmitInputs'),
    init: function () {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeModal();
      });
      this.divOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeModal();
      });
      return this;
    },
    openModal: function () {
      this.divInputsModal.classList.remove('hidden');
      this.divInputsModal.classList.add('fixed');
      this.divOverlay.classList.remove('hidden');
      this.divOverlay.classList.add('fixed');
      this.inputsContainer.focus();
    },
    closeModal: function () {
      this.submitInputs.removeEventListener('click', this.submitInputs.onclick);
      this.divInputsModal.classList.add('hidden');
      this.divOverlay.classList.remove('fixed');
      this.divOverlay.classList.add('hidden');
      this.inputsContainer.blur();
    },
  };
  const todoModal = {
    inputsContainer: document.getElementById('todoInputsContainer'),
    divInputsModal: document.getElementById('todoInputsModal'),
    divOverlay: document.getElementById('overlay'),
    closeBtn: document.getElementById('todoCloseModal'),
    submitInputs: document.getElementById('todoSubmitInputs'),
    init: function () {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeModal();
      });
      this.divOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeModal();
      });
      return this;
    },
    openModal: function () {
      this.divInputsModal.classList.remove('hidden');
      this.divInputsModal.classList.add('fixed');
      this.divOverlay.classList.remove('hidden');
      this.divOverlay.classList.add('fixed');
      this.inputsContainer.focus();
    },
    closeModal: function () {
      this.submitInputs.removeEventListener('click', this.submitInputs.onclick);
      this.divInputsModal.classList.add('hidden');
      this.divOverlay.classList.remove('fixed');
      this.divOverlay.classList.add('hidden');
      this.inputsContainer.blur();
    },
  };
  projectModal.init();
  todoModal.init();
  return { projectModal, todoModal };
};
export default popModal;
