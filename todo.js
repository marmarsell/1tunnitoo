console.log("fail uhendatud");

class Entry {
    constructor(title, description, date, priority, dayVal, monthVal, yearVal) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
        this.edited = "__";
        this.priority = priority;
        this.day = yearVal;
        this.month = monthVal;
        this.year = dayVal;
    }
}

class Todo {
    constructor(){
        this.entries = JSON.parse(localStorage.getItem("entries")) || [];
        this.render();
        document.querySelector("#addButton").addEventListener("click", () => {this.addEntry()});
    }

    addEntry() {
        console.log("vajutasin nuppu UWU");
        const titleValue = document.querySelector("#title").value;
        const descriptionValue = document.querySelector("#description").value;
        const dateValue = document.querySelector("#date").value;
        const priority = document.querySelector("#priority").value;

        //used Gabriel "my neighbour" to comprehend the breathtakingly liberal definition of Split().
        //date normalisation hehehehehehehehehehehehehehehehehehehehehehehehehehehehehe
        const dates  = dateValue.split("-");
        const yearVal = dates[0];
        const monthVal = dates[1];
        const dayVal = dates[2];
        console.log(yearVal, monthVal, dayVal);

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue, priority, yearVal, monthVal, dayVal));
        console.log(this.entries);
        this.save();
    }

    render() {
        let tasklist = document.querySelector("#taskList");
        tasklist.innerHTML = "";
    
        const ul = document.createElement("ul");
        const doneUl = document.createElement("ul");
        ul.className = "todo-list";
        doneUl.className = "todo-list";
        const taskHeading = document.createElement("h2");
        const doneHeading = document.createElement("h2");
        taskHeading.innerText = "Todo";
        doneHeading.innerText = "Done tasks";


        this.entries.forEach((entryValue, entryIndex) => {
            //console.log(yearVal, monthVal, dayVal);
            const li = document.createElement("li");
            const div = document.createElement("div");
            const buttonDiv = document.createElement("div");
            buttonDiv.className = "button-container";
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "X";
            deleteButton.className = "delete";

            const doneButton = document.createElement("button");
            doneButton.innerText = ">";
            doneButton.className = "done";
            
            const editButton = document.createElement("button");
            editButton.innerText = "E";
            editButton.className = "edit";

            deleteButton.addEventListener("click", () => {
                this.entries.splice(entryIndex, 1);
                this.save();
                
            });

            doneButton.addEventListener("click", () => {
                if(this.entries[entryIndex].done){
                    this.entries[entryIndex].done = false;
                } else{
                    this.entries[entryIndex].done = true;
                }
                
                this.save();
            });

            editButton.addEventListener("click", () => {
                console.log("EDIT TRIGGERED UWU");
                const titleValue = document.querySelector("#title").value;
                const descriptionValue = document.querySelector("#description").value;
                const dateValue = document.querySelector("#date").value;
                const priority = document.querySelector("#priority").value;

                //date normalisation hehehehehehehehehehehehehehehehehehehehehehehehehehehehehe
                const dates  = dateValue.split("-");
                const yearVal = dates[0];
                const monthVal = dates[1];
                const dayVal = dates[2];

                if(this.entries[entryIndex].title != titleValue && titleValue != null && titleValue != "") {
                    this.entries[entryIndex].edited = "✎";
                    this.entries[entryIndex].title = titleValue;
                }

                if(this.entries[entryIndex].description != descriptionValue && descriptionValue != null && descriptionValue != "") {
                    this.entries[entryIndex].edited = "✎";
                    this.entries[entryIndex].description = descriptionValue;
                }

                if(this.entries[entryIndex].date != dateValue && dateValue != null && dateValue != "") {
                    this.entries[entryIndex].edited = "✎";
                    this.entries[entryIndex].date = dateValue;

                    this.entries[entryIndex].day = dayVal;
                    this.entries[entryIndex].month = monthVal;
                    this.entries[entryIndex].year = yearVal;
                }

                if(this.entries[entryIndex].priority != priority) {
                    this.entries[entryIndex].edited = "✎";
                    this.entries[entryIndex].priority = priority;
                }
                
                this.save();
            });



            div.className = "task";
            
            div.innerHTML = 
            `<div>${entryValue.priority}</div>
            <div>${entryValue.edited}</div>
            <div>${"| " + entryValue.title + " |"}</div>
            <div>${entryValue.description}</div>
            <div>${"(" + entryValue.day + "." + entryValue.month + "." + entryValue.year + ")"}</div>
            `;
            
            if(this.entries[entryIndex].done){
                doneButton.classList.add("done-task");
                doneUl.appendChild(li);
            } else{
                ul.appendChild(li);
            }

            li.appendChild(div);
            li.appendChild(buttonDiv);
            buttonDiv.appendChild(deleteButton);
            buttonDiv.appendChild(doneButton);
            buttonDiv.appendChild(editButton);
        });

        tasklist.appendChild(taskHeading)
        tasklist.appendChild(ul);
        tasklist.appendChild(doneHeading);
        tasklist.appendChild(doneUl);
        
    }

    save() {
        localStorage.setItem("entries", JSON.stringify(this.entries));
        this.render();
    }
}

const todo = new Todo();