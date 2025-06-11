export const format_time = (time) => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");

    return `${m}:${s}`;
}

export const format_date = (isoString) => {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } 
    catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
};

export const get_rating_colors = (rating) => {
    if (typeof rating !== 'number') 
        return 'text-gray-400';
    if (rating >= 8) 
        return 'text-green-400'; 
    if (rating >= 5) 
        return 'text-yellow-400'; 
    return 'text-red-400'; 
};