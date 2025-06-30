document.addEventListener('DOMContentLoaded', function() {
    fetch('glossary.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data alphabetically by term
            data.sort((a, b) => a.term.localeCompare(b.term));

            const glossary = document.getElementById('glossary');
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.term}</strong>: ${item.definition}`;
                glossary.appendChild(li);
            });
        });

    document.getElementById('search').addEventListener('keyup', function() {
        let filter = this.value.toUpperCase();
        let glossary = document.getElementById('glossary');
        let terms = glossary.getElementsByTagName('li');

        for (let i = 0; i < terms.length; i++) {
            let term = terms[i].getElementsByTagName('strong')[0];
            if (term.innerHTML.toUpperCase().indexOf(filter) > -1) {
                terms[i].style.display = '';
            } else {
                terms[i].style.display = 'none';
            }
        }
    });
});