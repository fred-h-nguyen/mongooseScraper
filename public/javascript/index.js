$(document).ready(() => {

    const articleDiv = $('.article-div');
    $(document).on('click', '.btn.save', saveArticle);
    $(document).on('click','.scrape',scrape);


    const renderArticles = articles => {
        const articleCards = articles.map(article => createCard(article));
        articleDiv.append(articleCards);
    }

    const createCard = article => {
        const card = $('<div class="card">');
        const header = $('<div class="card-header">').append(
            $('<h3>').append(
                $('<a class = "article-link" target="blank">')
                    .attr('href', article.link)
                    .text(article.title),
                $('<a class= "btn btn-success save">')
                    .text('Save Article')
            )
        )

        const body = $('<div class="card-body">').text(article.summary);
        card.append(header, body)
        card.data('_id', article._id);
        return card
    }

    const renderEmpty = ()=>{
       const emptyAlert = $(
            [
              "<div class='alert alert-warning text-center'>",
              "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
              "</div>",
              "<div class='card'>",
              "<div class='card-header text-center'>",
              "<h3>What Would You Like To Do?</h3>",
              "</div>",
              "<div class='card-body text-center'>",
              "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
              "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
              "</div>",
              "</div>"
            ].join("")
          );
          // Appending this data to the page
          articleDiv.append(emptyAlert);
    }
    const saveArticle = () => {
        const article = $(this).parents('.card').data();

        $(this).parent('.card').remove();

        article.saved = true
        $.ajax({
            url: `/api/headlines/${article._id}`,
            method: 'PUT',
            data: article
        }).then(data=>{
            if(data.saved){
                initPage();
            }
        })
    }

    const scrape = ()=>{
        $.get('api/scrape').then(data =>{
            initPage();
        })
    }

    const initPage = () => {
        $.get('/api/headlines?saved=false').then(data=>{
            articleDiv.empty();
            if (data && data.length){
                renderArticles(data)
            } else{
                renderEmpty();
            }
        })
    }
})