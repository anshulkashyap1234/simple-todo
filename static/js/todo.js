// create two global variable 
var conts;
var data;

// this function is use to hideshow from of new task
function hideShow() {
    var x = document.getElementById("card_section");

    x.style.display = "flex";
}


// this function is use to hideshow from of update task
function hideShows() {
    var x = document.getElementById("card_section1");

    x.style.display = "flex";
}





// this funtion is use to get data from new task from and create a new task
document.getElementById('postform').addEventListener('submit', getdata);
function getdata(e) {
    e.preventDefault();

    var name = document.getElementById('userInput').value;
    var userData = document.getElementById('comment').value;
    var params = { user_input: name, user_data: userData }
    // send http request to our backend program of add funciton to add data in our database
    var xhr = new XMLHttpRequest()

    xhr.open('post', '../add', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = function () {
//when the data will be loaded then the form section will be closed
        flyoutEl = document.getElementById('card_section');
        flyoutEl.style.display = "none";
        console.log('reached')
        //this function is use to create dynamic html content by using two parameter name and data
        displaytask(name, userData)
        // this is use to reset the form and not to store privous data
        var element = document.getElementById('postform');
        element.reset();
        //document.getElementById('prediction').innerHTML= this.responseText;
    }
    //send data in json format
    xhr.send(JSON.stringify(params));
}

// create a i varible to assing a value to all element to identify each element
let i = 0;

function displaytask(name, userData) {
    // get the container 
    var container = document.querySelector('.container_section');


// create dynamic content
    let p = `
    <div class="container">
    <h1 id="name-${i}">${name}</h1>
    <p id="details-${i}">${userData} </p>

    <button class="button check"   id="check-${i}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  class="bi bi-check-square-fill checkbtn" viewBox="0 0 16 16"> <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/> </svg>
    </button>


        <button class="button update" value="${[name, userData]}" name="names" type="submit" onclick="hideShows()"
            id="update-${i}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                class="bi bi-pencil-square svgIcon" viewBox="0 0 16 16">
                <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
        </button>
    

    

        <button class="button delete"  value="${name}" name="${name}"" id="delete-${i}" >
            <svg viewBox="0 0 448 512" class="svgIcon">
                <path
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                </path>
            </svg>
        </button>
        </div>
    
`;
// insert dynamic content in container
    container.insertAdjacentHTML("beforeend", p)
// this function is use to element using id to element
    document.querySelector('#delete-' + i)
        .addEventListener('click', function () {
            let removeE = this.parentNode;
            let name = this.value
            // deldata function is send to a http request to server to delelte the data from database
            deldata(name)
            // this will remove child from the container
            container.removeChild(removeE)


        })
        // this is use to for getting done a task to higlight the task that will be done
    document.querySelector('#check-' + i)
        .addEventListener('click', function () {
            console.log(this.parentNode)
            let dev = this.parentNode;
            dev.style.boxShadow = '0px 2px 12px 0px #9c2c1d63';
            this.style.backgroundColor = 'blue'

        })
        // this funtion is use to update the element
    document.querySelector('#update-' + i)
        .addEventListener('click', function () {
            conts = this;
            data = this.value;
            data = data.split(",");
            console.log(conts)
            document.getElementById('task_name').value = data[0];
            document.getElementById('task_details').innerHTML = data[1];



        });
        // this use to send data to sever and changes are done in database
    document.querySelector('#updatebtn')
        .addEventListener('click', function (e) {
            //console.log('#update-' + i)
            e.preventDefault();
            let oldname = data[0];
            var name = document.getElementById('task_name').value;
            var userData = document.getElementById('task_details').value;
            var params = { user_input: name, user_data: userData, old_data: oldname }




            var xhrs = new XMLHttpRequest()

            xhrs.open('post', '../update', true)
            xhrs.setRequestHeader('Content-type', 'application/json')
            xhrs.onload = function () {

                flyoutEl = document.getElementById('card_section1');
                flyoutEl.style.display = "none";



                var element = document.getElementById('updateform');
                element.reset();


                //document.getElementById('prediction').innerHTML= this.responseText;
            }
            xhrs.send(JSON.stringify(params));
            let removeE = conts.parentNode;

            deldata(oldname)
            container.removeChild(removeE)
            displaytask(name, userData)


        });

    i++;
}


// this funtion is use to delete the data form server side
function deldata(name) {




    var params = { user_input: name }
    var xhr = new XMLHttpRequest()

    xhr.open('post', '../delete', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = function () {

        console.log('reached')

        //document.getElementById('prediction').innerHTML= this.responseText;
    }
    xhr.send(JSON.stringify(params));
}


// this funtion is load on data on webpage when webpage is reloaded

window.onload = function () {

    var xhrr = new XMLHttpRequest()

    xhrr.open('get', '../api/todo', true)
    xhrr.setRequestHeader('Content-type', 'application/json')
    xhrr.onload = function () {


        console.log('reached')
        let arr = JSON.parse(this.responseText)

        for (var i = 0; i < arr.length; i++) {

            var obj = arr[i];
            //console.log(obj[0],obj[1])
            displaytask(obj[0], obj[1])

        }

        //document.getElementById('prediction').innerHTML= this.responseText;
    }
    xhrr.send()
}

