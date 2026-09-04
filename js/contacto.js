document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const formBtn = document.getElementById('form-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      formBtn.disabled = true;
      formBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = "¡Mensaje enviado con éxito! Te responderé pronto.";
          formStatus.className = "form-status success";
          contactForm.reset();
        } else {
          throw new Error('Error al enviar el mensaje');
        }
      } catch (error) {
        formStatus.textContent = "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.";
        formStatus.className = "form-status error";
      } finally {
        formBtn.disabled = false;
        formBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
      }
    });
  }
});