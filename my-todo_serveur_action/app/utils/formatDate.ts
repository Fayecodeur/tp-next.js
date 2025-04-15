export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() +1 < 10 ? `0${date.getMonth() +1}` : date.getMonth() +1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    // 01/02/2024
    return `${day}/${month}/${year}`;
}