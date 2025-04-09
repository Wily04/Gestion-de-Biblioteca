const loginForm = document.querySelector('form') as HTMLFormElement;

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const emailInput = document.querySelector('input[type="text"]') as HTMLInputElement;
  const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('http://localhost:3300/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, contraseña: password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Bienvenido, ${data.usuario.nombre}`);
      
      window.location.href = 'inicio.html';
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Ocurrió un error, intenta nuevamente.');
  }
});