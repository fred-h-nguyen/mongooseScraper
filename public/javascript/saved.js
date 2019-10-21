$(document).ready(() => {
    var articleDiv = $('article-div');
    $(document).on('click', '.btn.delete', deleteArticle);
    $(document).on('click', '.btn.notes', viewNotes);
    $(document).on('click', '.btn.save', saveNote);
    $(document).on('click', '.btn.delete-note', deleteNote);

    var initPage = () => {
        $.get('/api/headlines?saved=true').then(data => {
            articleDiv.empty();
            if (data && data.length) {
                renderArticles(data)
            } else {
                renderEmpty();
            }
        })
    }

    var renderArticles = articles => {
        var articleCards = articles.map(article => createCard(article));
        articleDiv.append(articleCards);
    }

    var createCard = article => {
        var card = $('<div class="card">');
        var header = $('<div class="card-header">').append(
            $('<h3>').append(
                $('<a class = "article-link" target="blank">')
                    .attr('href', article.link)
                    .text(article.title),
                $('<a class= "btn btn-danger delete">')
                    .text('Delete Article'),
                $('<a class= "btn btn-info notes">')
                    .text('View Notes')
            )
        )
        var body = $('<div class="card-body">').text(article.summary);
        card.append(header, body)
        card.data('_id', article._id);
        return card
    }

    var renderEmpty = () => {
        var emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-header text-center'>",
                "<h3>What Would You Like To Do?</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a href='/'>Browse Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        // Appending this data to the page
        articleDiv.append(emptyAlert);
    }

    var renderNotes = data => {
        var notesToRender = [];
        var currentNote;
        if (!data.notes.length) {
            currentNote = $('<li class="list-group-item"').text('No notes for thie article.');
            notesToRender.push(currentNote);
        } else {
            notesToRender.map(note => {
                currentNote = $('<li class="list-group-item note">')
                    .text(data.notes[i].noteText)
                    .append($('<button class="btn btn-danger note-delete">x</button>'));
                currentNote.children('button').data('_id', data.notes._id);
            })
        }
        $('.note-div').append(notesToRender);
    }

    var deleteArticle = () => {
        var article = $(this)
            .parents('.card')
            .data();

        $(this).parents('.card').remove();

        $.ajax({ url: `/api/headlines/${article._id}`, method: 'DELETE' })
            .then(data => {
                if (data.ok) {
                    initPage();
                }
            })
    }

    var viewNotes = event => {
        var currentArticle = $(this).parent('.card').data();

        $.get(`/api/notes/${currentArticle._id}`)
            .then(data => {
                var modalText = $('<div class= "container-fluid text-center">').append(
                    $('<h4>')
                        .text(`Notes for Article ${currentArticle._id}`),
                    $('<hr>'),
                    $('<ul class= "list-group note-div>'),
                    $('<textarea placeholder= "New Note" rows="4" cols ="60">'),
                    $('<button class= "btn btn-success save">')
                        .text('Save Note')
                )
                bootbox.dialog({
                    message: modalText,
                    closeButton: true
                });
                var noteData = {
                    _id: currentArticle._id,
                    notes: data || []
                };
                $('.btn.save').data('article', noteData);
                renderNotes(noteData);
            })
    }

    var saveNote = () => {
        var noteData;
        var newNote = $('.bootbox-body textarea')
            .val()
            .trim();

        if (newNote) {
            var headlineId = $(this).data('article')._id
            noteData = {
                body: newNote
            }
            $.post(`/api/notes/${headlineId}`, noteData)
                .then(data => {
                    bootbox.hideAll();
                })
        }
    }

    var deleteNote = () => {
        var noteToDelete = $(this).data('_id');

        $.ajax({ url: `/api/notes/${noteToDelete}`, method: 'DELETE' })
            .then(data => {
                bootbox.hideAll();
            })
    }
});