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