
// Ограничение максимального размера файла в мегабайтах
export const maxFileSize = (maxSizeMB) => (file) => {
    if (!file) {
        return true;
    }
    const fileSizeinKb = file.size / (1024 * 1024);
    const size = Math.round(fileSizeinKb * 100) / 100;
    return size <= maxSizeMB;
}


// Проверить, что файл имеет определённое расширение
export const allowedExtensions = (extensions = []) => (file) => {
    if (!file) {
        return true;
    }
    const ext = file.name.split('.').pop();
    return extensions.includes(ext);
}
