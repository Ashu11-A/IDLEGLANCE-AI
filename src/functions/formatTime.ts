export function formatTime (segundos: number) {
    const horas = Math.floor(segundos / 3600)
    const minutos = Math.floor((segundos % 3600) / 60)
    const segundosRestantes = segundos % 60

    let string = ''
    if (horas > 0) string += horas.toString().padStart(2, '0') + ':'
    string += minutos.toString().padStart(2, '0') + ':'
    string += segundosRestantes.toFixed().toString().padStart(2, '0')

    return string
};
  