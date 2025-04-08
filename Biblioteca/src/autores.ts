
async function cargarAutores() {
    try {
        const response = await fetch('/autores'); 
        if (!response.ok) {
            throw new Error(`Error al obtener autores: ${response.statusText}`);
        }

        const autores = await response.json();
        const tabla = document.getElementById('tablaAutores') as HTMLElement;

        tabla.innerHTML = autores.map((autor: any) => `
            <tr>
                <td>${autor.autor_id}</td>
                <td>${autor.nombre}</td>
                <td>${autor.nacionalidad}</td>
                <td>${new Date(autor.fecha_nacimiento).toLocaleDateString()}</td>
                <td>${autor.fecha_fallecimiento ? new Date(autor.fecha_fallecimiento).toLocaleDateString() : 'N/A'}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error al cargar autores:', error);
        alert('Hubo un problema al cargar la lista de autores');
    }
}

async function registrarAutor(event: Event) {
    event.preventDefault();
    const form = document.getElementById('formAutor') as HTMLFormElement;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/autores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Autor registrado con éxito');
            form.reset(); 
            await cargarAutores(); 
        } else {
            const error = await response.json();
            console.error('Error al registrar autor:', error);
            alert('No se pudo registrar el autor');
        }
    } catch (err) {
        console.error('Error en la conexión:', err);
        alert('Error al conectar con el servidor');
    }
}

document.getElementById('formAutor')?.addEventListener('submit', registrarAutor);

cargarAutores();