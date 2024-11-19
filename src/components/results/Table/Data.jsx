export const format_date = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const combine_data = (data) => {
    const combined = {};

    data.forEach(histogram => {
        histogram.data.forEach(item => {
            const date_key = item.date.split('T')[0];
            if (!combined[date_key]) {
                combined[date_key] = { period: format_date(date_key), total: 0, risks: 0 };
            }
            if (histogram.histogramType === 'totalDocuments') {
                combined[date_key].total += item.value;
            } else if (histogram.histogramType === 'riskFactors') {
                combined[date_key].risks += item.value;
            }
        });
    });

    return Object.values(combined).sort((a, b) => new Date(a.period) - new Date(b.period));
};