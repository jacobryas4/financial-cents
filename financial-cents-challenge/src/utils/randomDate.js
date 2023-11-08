export default function randomDate() {
    const start = new Date(2022, 0, 1); 
    const end = new Date(2023, 11, 31); 
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return randomDate.toLocaleDateString('en-US', options);
}