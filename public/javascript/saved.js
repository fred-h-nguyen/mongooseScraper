$(document).ready(() => {
    const articleDiv = $('article-div');
    $(document).on('click', '.btn.delete', deleteArticle);
    $(document).on('click', '.btn.notes', viewNotes);
    $(document).on('click', '.btn.save', saveNote);
    $(document).on('click', '.btn.delete-note', deleteNote);

    const initPage = () => {
        $.get('/api/headlines?saved=true').then(data => {
            articleDiv.empty();
            if (data && data.length) {
                renderArticles(data)
            } else {
                renderEmpty();
            }
        })
    }

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
                $('<a class= "btn btn-danger delete">')
                    .text('Delete Article'),
                $('<a class= "btn btn-info notes">')
                    .text('View Notes')
            )
        )
        const body = $('<div class="card-body">').text(article.summary);
        card.append(header, body)
        card.data('_id', article._id);
        return card
    }

    const renderEmpty = () => {
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
                "<h4><a href='/'>Browse Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        // Appending this data to the page
        articleDiv.append(emptyAlert);
    }

    const renderNotes = data => {
        const notesToRender = [];
        let currentNote;
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

    const deleteArticle = () => {
        const article = $(this)
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

    const viewNotes = event => {
        const currentArticle = $(this).parent('.card').data();

        $.get(`/api/notes/${currentArticle._id}`)
            .then(data => {
                const modalText = $('<div class= "container-fluid text-center">').append(
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
                const noteData = {
                    _id: currentArticle._id,
                    notes: data || []
                };
                $('.btn.save').data('article', noteData);
                renderNotes(noteData);
            })
    }

    const saveNote = () => {
        let noteData;
        const newNote = $('.bootbox-body textarea')
            .val()
            .trim();

        if (newNote) {
            const headlineId = $(this).data('article')._id
            noteData = {
                body: newNote
            }
            $.post(`/api/notes/${headlineId}`, noteData)
                .then(data => {
                    bootbox.hideAll();
                })
        }
    }

    const deleteNote = () => {
        const noteToDelete = $(this).data('_id');

        $.ajax({ url: `/api/notes/${noteToDelete}`, method: 'DELETE' })
            .then(data => {
                bootbox.hideAll();
            })
    }
});