(function ($) {
    console.log("jQuery"+$);
    $.fn.todo = function (options){
        console.log("call todo plugin");

        let defaults = {
            serverURL : "example.com/server_side_code_uri"
        }

        options = $.extend(defaults, options);

        return this.each(function (i, obj){
           console.log("obj: "+obj);

           let $this = $(this); //convenzione dichiarazione oggetto jQuery

            $this.wrap('<div class="plugin_wrapper" />');

            $this.addClass('to-do-list-container');

            $(
                '<h2>My ToDoList</h2>' +
                '<textarea class="todo_textarea"></textarea>' +
                '<input type="submit" value="add to do" class="to_do_submit">'
            ).insertBefore($this);

            let $submitButton = $('.to_do_submit', $this.parent());

            $submitButton.on('click', function (){
                console.log("sendToDo");
                sendToDo($this);
            });
        });

        function sendToDo($el){
            let $this = $el;
            let $todoText = $this.parent().find('.todo_textarea');
            let todoText = $todoText.val();

            console.log("Test length");
            if(todoText.length > 2){
                let request = $.ajax({
                   url : options.serverURL,
                   type : "POST",
                   data : {
                       "text" : todoText,
                       "action" : "insert"
                   },
                   dataType : "json"
                });

                request.done(function (data){
                   console.log("REQUEST.DONE: "+data);
                   handleInsert(data, $this);
                });

                request.fail(function (jqXHR, textStatus){
                    console.log("Request failed: " +textStatus);
                });
            }
        }

        function handleInsert(data, $el) {
            console.log("todo added in db");
            let $this = $el;
            let todos = data["todos"];
            let html = "";

            if(
                !($(".todo-list", $this).length > 0)
            ){
                let $toDoList = $("<ul class='todo-list'></ul>");
                $this.append($toDoList);
            }

            html += "<li data-id='todo_" + todos[0]['id']+"'><span class='todo_text'>" + todos[0]['text'] + "</span>" +
                "<span class='deleter'>x</span></li>";
            $(".todo-list",$this).prepend(html);
        }
        console.log("dkjfhadkljfa");
    }
})(jQuery);