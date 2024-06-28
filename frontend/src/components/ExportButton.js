import React from 'react';

const ExportButton = ({ url, filename }) => {
    const handleExport = () => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => alert('Error exporting data'));
    };

    return <button onClick={handleExport}>Export CSV</button>;
};

export default ExportButton;
