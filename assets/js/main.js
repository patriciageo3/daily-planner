$(document).ready(function() {
    
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    
    function sortGeneral(a, b) {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
        //return a - b; // does not work with strings!!!
    }
    
    function displayTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks !== null) {
            
            tasks.sort((a,b) => {
                let aDateClean = a.taskDate.replace(/-/g, "");
                let bDateClean = b.taskDate.replace(/-/g, "");
                let aDate = parseInt(aDateClean);
                let bDate = parseInt(bDateClean);
                let aTimeClean = a.taskTime.replace(/:/g, "");
                let bTimeClean = b.taskTime.replace(/:/g, "");
                let aTime = parseInt(aTimeClean);
                let bTime = parseInt(bTimeClean);
                let aPriority = (a.taskPriority === "low") ? 3 : (a.taskPriority === "normal") ? 2 : 1;
                let bPriority = (b.taskPriority === "low") ? 3 : (b.taskPriority === "normal") ? 2 : 1;
                let aName = a.task.toLowerCase();
                let bName = b.task.toLowerCase();
                //debugger;
                return sortGeneral(aDate, bDate) || sortGeneral(aTime, bTime) || sortGeneral(aPriority, bPriority) || sortGeneral(aName, bName);
            });
             
            /* tasks.sort((a,b) => {
                let aDateClean = a.taskDate.replace(/-/g, "");
                let bDateClean = b.taskDate.replace(/-/g, "");
                let aDate = parseInt(aDateClean);
                let bDate = parseInt(bDateClean);
                let aTimeClean = a.taskTime.replace(/:/g, "");
                let bTimeClean = b.taskTime.replace(/:/g, "");
                let aTime = parseInt(aTimeClean);
                let bTime = parseInt(bTimeClean);
                let aName = a.task.toLowerCase();
                let bName = b.task.toLowerCase();
                if (aDate === bDate) {
                    if (aTime < bTime) return -1; 
                    if (aTime > bTime) return 1;
                    if (aTime === bTime) {
                        return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
                    }
                }
                return aDate - bDate;
            });  */
             
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
    
    function addTask(event) {
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
        let dateCleaned = taskDate.replace(/-/g, "");
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
    
    displayTasks();
    
    $("#task-form").submit(function(event) {
        addTask(event);
    });
});