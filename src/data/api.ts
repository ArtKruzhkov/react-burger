const checkResponse = (response: Response): Promise<any> => {
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
};

export default checkResponse;