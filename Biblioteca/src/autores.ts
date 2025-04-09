import axios from 'axios';

const API_URL = 'http://localhost:3300/autores'; 

export async function getAutores() {
  return axios.get(API_URL).then((response) => response.data);
}

export async function insertAutor(autor: {
  nombre: string;
  nacionalidad: string;
  fch_nacimiento: string;
  fch_fallecimiento?: string | null;
}) {
  return axios.post(API_URL, autor).then((response) => response.data);
}

// Eliminar un autor
export async function deleteAutor(id: number) {
  return axios.delete(`${API_URL}/${id}`).then((response) => response.data);
}