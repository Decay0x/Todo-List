const popModal = () => {
  const modal = {
    projectInputContainer: document.getElementById('projectInputContainer'),
    divInputsModal: document.getElementById('inputsModal'),
    divOverlay: document.getElementById('overlay'),
    closeBtn: document.getElementById('closeModal'),
    submitInputs: document.getElementById('submitInputs'),
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
      this.projectInputContainer.focus();
    },
    closeModal: function () {
      this.submitInputs.removeEventListener('click', this.submitInputs.onclick);
      this.divInputsModal.classList.add('hidden');
      this.divOverlay.classList.remove('fixed');
      this.divOverlay.classList.add('hidden');
      this.divInputsModal.querySelectorAll('.projectInput').forEach((input) => {
        input.removeAttribute('selected'), input.classList.add('hidden');
      });
      this.projectInputContainer.blur();
    },
  };

  return modal.init();
};
export default popModal;
