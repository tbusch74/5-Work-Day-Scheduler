if (localStorage.getItem("tasks") === null) {
    savedTasks = []
}

var refreshBackground = function() {
    $(".time-block").each(function(index){
        $(".task-area").eq(index).removeClass("past present future")
        if (moment().format("H") > index + 9) {
            $(".task-area").eq(index).addClass("past")
        }
        else if (moment().format("H") === index + 9) {
            $(".task-area").eq(index).addClass("present")
        }
        else if (moment().format("H") < index + 9) {
            $(".task-area").eq(index).addClass("future")
        }
    });
};

var saveTasks = function(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"))
};

$("div").on("click", ".task-area", function() {
    var text = $(this).text();
    var textInput = $("<textarea>").val(text).addClass("col-8");
    $(this).replaceWith(textInput)
    textInput.trigger("focus");
});

$("div").on("blur", "textarea", function() {
    var text = $(this).val();
    var textDiv = $("<div>").addClass("col-8 task-area").text(text);
    $(this).replaceWith(textDiv);
    refreshBackground();
})

$(".saveBtn").on("click", function(){
    var taskInfo = {
        time: $(this).closest(".time-block").val(),
        task: $(this).closest(".task-area").val()
    }
    savedTasks.push(taskInfo);
    console.log(taskInfo);
})

refreshBackground();
setInterval(refreshBackground,30000)
