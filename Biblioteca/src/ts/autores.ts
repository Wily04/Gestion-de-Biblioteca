document.addEventListener('DOMContentLoaded', () => {
  const formAutor = document.getElementById('formAutor') as HTMLFormElement | null;
  const tablaAutoresBody = document.getElementById('tablaAutores') as HTMLTableSectionElement | null;

  if (formAutor) {
    formAutor.addEventListener('submit', async (event: SubmitEvent) => {
      event.preventDefault();

      const nombreInput = formAutor.querySelector<HTMLInputElement>('input[name="nombre"]');
      const nacionalidadInput = formAutor.querySelector<HTMLInputElement>('input[name="nacionalidad"]');
      const fechaNacimientoInput = formAutor.querySelector<HTMLInputElement>('input[name="fecha_nacimiento"]');
      const fechaFallecimientoInput = formAutor.querySelector<HTMLInputElement>('input[name="fecha_fallecimiento"]');

      if (nombreInput && nacionalidadInput && fechaNacimientoInput) {
        const nuevoAutor = {
          nombre: nombreInput.value,
          nacionalidad: nacionalidadInput.value,
          fch_nacimiento: fechaNacimientoInput.value,
          fch_fallecimiento: fechaFallecimientoInput?.value || null,
        };

        try {
          const response = await fetch('http://localhost:3300/api/autores/insterarautores', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoAutor),
          });

          console.log('Response from register:', response);

          if (response && response.ok) {
            const data: any = await response.json();
            console.log('Autor registrado exitosamente:', data);
            alert('Autor registrado exitosamente!');
            formAutor.reset();
            fetchAutores(); 
          } else {
            const error: any = await response.json();
            console.error('Error al registrar el autor:', error);
            alert('Error al registrar el autor.');
          }
        } catch (error) {
          console.error('Error de red:', error);
          alert('Error de red al intentar registrar el autor.');
        }
      } else {
        console.error('No se encontraron todos los campos requeridos del formulario.');
        alert('Por favor, completa todos los campos requeridos.');
      }
    });
  } else {
    console.error('No se encontró el formulario con el ID "formAutor".');
  }

  
  async function fetchAutores() {
    if (!tablaAutoresBody) {
      console.error('No se encontró el elemento tbody con el ID "tablaAutores".');
      return;
    }

    tablaAutoresBody.innerHTML = ''; 

    try {
      const response = await fetch('http://localhost:3300/api/autores/listarautores');
      console.log('Response from list:', response); 

      if (!response.ok) {
        const message = `Error al obtener autores: ${response.status}`;
        throw new Error(message);
      }
      const autores: any[] = await response.json(); 
      autores.forEach(autor => {
        const row = tablaAutoresBody.insertRow();

        const idCell = row.insertCell();
        idCell.textContent = autor.autor_id;

        const nombreCell = row.insertCell();
        nombreCell.textContent = autor.nombre;

        const nacionalidadCell = row.insertCell();
        nacionalidadCell.textContent = autor.nacionalidad;

        const fechaNacimientoCell = row.insertCell();
        fechaNacimientoCell.textContent = new Date(autor.fecha_nacimiento).toLocaleDateString();

        const fechaFallecimientoCell = row.insertCell();
        fechaFallecimientoCell.textContent = autor.fecha_fallecimiento ? new Date(autor.fecha_fallecimiento).toLocaleDateString() : '';
      });

    } catch (error) {
      console.error('Error al cargar la lista de autores:', error);
      alert('Error al cargar la lista de autores.');
    }
  }

  fetchAutores();
});