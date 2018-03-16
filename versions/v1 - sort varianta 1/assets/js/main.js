$(document).ready(function() {
    
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    
    function addTask(event) {
        //event.preventDefault();
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        (month < 10) ? month = "0" + month : month;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let id = date.getTime();
        let dateNow = parseInt(String(year) + month + day);
        (minutes < 10) ? minutes = "0" + minutes : minutes;
        let timeNow = String(hour) + minutes;        
        
        let task = $("#task").val().trim();
        let taskPriority = $("#priority").val();
        let taskDate = $("#date").val(); //"2018-03-20"
        let dateCleaned = taskDate.replace(/[-]/g, "");
        let dateSet = parseInt(dateCleaned);
        let taskTime = $("#time").val(); // "01:00" / "13:00" 
        let timeCleaned = taskTime.split(":").join("");
        let timeSet = parseInt(timeCleaned);
        
        //console.log(taskDate, taskTime);
        
        if ( !task ) {
            event.preventDefault();
            alert("Please insert a valid task!");  
        } else if (dateSet < dateNow) {
            event.preventDefault();
            alert("Your task date is messed up!");
        } else if (dateSet === dateNow && timeSet < timeNow) {
            event.preventDefault();
            alert("Your task time is messed up!");
        } else  {
            tasks = tasks || [] ; 
            let newTask = {
                id,
                task,
                taskPriority,
                taskDate,
                taskTime 
            };
            
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } 
    }
    
    function displayTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks !== null) {
            tasks = sortAllTasks();
            $.each(tasks, function(index, elem) {
                $(".table").eq(0).append(`<tr id="${elem.id}">
                                       <td>${elem.task} </td>
                                       <td>${elem.taskPriority} </td>
                                       <td>${elem.taskDate} </td>
                                       <td>${elem.taskTime} </td>
                                       <td><a href="edit.html?id='${elem.id}'">Edit</a> / <a href="#"> Remove</a></td>
                                       </tr>`);
            });
            
        }
    }
    
    function sortAllTasks() {
        let dates = [];
        $.each(tasks, function(index, elem) {
            let d = elem.taskDate.replace(/[-]/g, "");
            dates.push(parseInt(d));
            dates.sort((a, b) => a - b);
            // bagat filtru si pe time daca is egale
            // sortat direct oare nu merge?
        });
        
        let sortedTasks = [];
        $.each(tasks, function(index, elem) {
            let d = elem.taskDate.replace(/[-]/g, "");
            d = parseInt(d);
            let sortedIndex = dates.indexOf(d);
            sortedTasks.splice(sortedIndex, 0, elem);            
        });
        return sortedTasks;
        //debugger; 
    }
    
    displayTasks();
    
    $("#task-form").submit(function(event) {
        addTask(event);
    });
});