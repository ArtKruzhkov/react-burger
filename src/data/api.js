export const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
};