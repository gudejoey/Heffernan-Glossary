document.addEventListener('DOMContentLoaded', function() {
    fetch('glossary.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data alphabetically by term
            data.sort((a, b) => a.term.localeCompare(b.term));

            const glossaryContainer = document.getElementById('glossary-container');
            const sideNav = document.getElementById('side-nav');
            let currentLetter = '';

            data.forEach(item => {
                // Extract the first letter from the term
                const firstLetter = item.term.charAt(0).toUpperCase();

                // Create a new letter section if needed
                if (firstLetter !== currentLetter) {
                    currentLetter = firstLetter;
                    const letterHeading = document.createElement('h2');
                    letterHeading.textContent = currentLetter;
                    letterHeading.id = currentLetter; // Add an ID for navigation
                    glossaryContainer.appendChild(letterHeading);

                    // Add letter to side navigation
                    const navLink = document.createElement('a');
                    navLink.href = `#${currentLetter}`;
                    navLink.textContent = currentLetter;
                    sideNav.appendChild(navLink);
                }

                // Create the list item
                const li = document.createElement('li');
                const phrase = item.definition ? `${item.phrase}, ${item.definition}` : item.phrase;
                li.innerHTML = `<h3>${item.term}</h3><p>${phrase}</p>`;
                glossaryContainer.appendChild(li);
            });
        });

    document.getElementById('search').addEventListener('keyup', function() {
        let filter = this.value.toUpperCase();
        let glossaryContainer = document.getElementById('glossary-container');
        let terms = glossaryContainer.getElementsByTagName('li');
        let headings = glossaryContainer.getElementsByTagName('h2');

        for (let i = 0; i < terms.length; i++) {
            let term = terms[i].getElementsByTagName('h3')[0];
            if (term.innerHTML.toUpperCase().indexOf(filter) > -1) {
                terms[i].style.display = '';
            } else {
                terms[i].style.display = 'none';
            }
        }

        // Check each letter heading
        for (let i = 0; i < headings.length; i++) {
            let heading = headings[i];
            let nextSibling = heading.nextElementSibling;
            let hasVisibleTerms = false;

            // Check if any terms under this heading are visible
            while (nextSibling && nextSibling.tagName !== 'H2') {
                if (nextSibling.style.display !== 'none') {
                    hasVisibleTerms = true;
                    break;
                }
                nextSibling = nextSibling.nextElementSibling;
            }

            // Show or hide the heading based on visible terms
            heading.style.display = hasVisibleTerms ? '' : 'none';
        }
    });
});