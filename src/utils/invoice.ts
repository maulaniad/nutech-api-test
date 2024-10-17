const generateInvoice = (service_code: string) => {
    const date = new Date().getFullYear();
    const randomNumber = Math.floor(Math.random() * 1000);

    return `${service_code}-${date}-${randomNumber}`;
}

export { generateInvoice };
