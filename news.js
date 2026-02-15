document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    const rssUrl = 'https://tabyjudo.se/Home/NewsRss'; //Behövs för att hämta RSS-flödet från lagets nyheter
    const maxNewsItems = 3; // Maximala antal nyheter att visa
    
    // Fetch the RSS feed
    fetch(rssUrl)
        .then(response => response.text())
        .then(data => {
            // Parse XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            
            newsContainer.innerHTML = '';
            
            // Hämta alla nyheter
            const items = xmlDoc.querySelectorAll('item');
            
            if (items.length === 0) {
                newsContainer.innerHTML = '<p>Inga nyheter hittades</p>';
                return;
            }
            
            //Ta de n senaste nyheterna
            const recentItems = Array.from(items).slice(0, maxNewsItems);
            
            recentItems.forEach(item => {
                const title = item.querySelector('title')?.textContent || 'Ingen titel tillgänglig.';
                const link = item.querySelector('link')?.textContent || '#';
                const description = item.querySelector('description')?.textContent || 'Ingen beskrivning tillgänglig.';
                const pubDate = item.querySelector('pubDate')?.textContent || 'Inget datum tillgängligt.';
                
                const enclosure = item.querySelector('enclosure');
                //om det är en bild
                let imageUrl = enclosure && enclosure.getAttribute('type')?.startsWith('image/') ? enclosure.getAttribute('url') : null;

                //Bilden finns i olika storlekar, där det anges filnamn_small, filnamn_medium, filnamn_large eller orginalet filnamn.jpg eller png vad det nu än är
                //om det är en bild och den har _small, _medium eller _large i sig så ta bort det så att den inte blir suddigare än den behöver vara, så att man kan läsa innehåll vid behov
                if (imageUrl) {
                    const imageParts = imageUrl.split('_');
                    if (imageParts.length > 1) {
                        imageUrl = imageParts.slice(0, -1).join('_') + '.' + imageParts[imageParts.length - 1].split('.').pop();
                    }
                }
                
                const formattedDate = pubDate !== 'Inget datum tillgängligt.' ? new Date(pubDate).toLocaleDateString() : pubDate;
                
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                
                //skapa html div
                let contentHtml = `
                    <div class="news-content">
                        <div class="news-title">
                            ${title}
                        </div>
                        <div class="news-source">
                            <a href="${link}" target="_blank">Se orginal <i class="fas fa-external-link-alt"></i></a>
                            ${imageUrl ? `<br><a href="${imageUrl}" target="_blank">Visa bilaga<i class="fas fa-external-link-alt"></i></a>` : ''}
                        </div>
                        <div class="news-date">${formattedDate}</div>
                        <div class="news-description">${description}</div>
                    </div>`;

                
                let imageHtml = '';
                if (imageUrl) {
                    imageHtml = `
                    <div class="news-image">
                        <a href='${imageUrl}' target='blank'><img src="${imageUrl}" alt="${title}" loading="lazy"></a>
                    </div>`;
                }
                
                newsItem.innerHTML = contentHtml + imageHtml;
                
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => {
            newsContainer.innerHTML = `<p>Kunde inte hämta nyheter. Testa att ladda om sidan eller använd Laget-Appen. Information publiceras ofta också på Täby Judoklubbs Facebook- och Instagramsidor</p>`;
            console.error('Error fetching RSS feed:', error);
        });
});
