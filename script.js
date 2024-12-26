let data = [
   
]

let tbody =document.getElementById("tbody")


document.getElementById("search").addEventListener("keyup",function(e){

   let val = e.target.value.toUpperCase()

   let searchData = data.filter((ele) => !ele.list.toUpperCase().indexOf(val))


   showData(searchData)
})

document.getElementById("form").addEventListener("submit",function(e){
  e.preventDefault();
   let id = document.getElementById("id").value
  let todo_list = document.getElementById("todo_list").value
    if(id){

     let updateData =   data.map((ele) => {

            if(ele.id == id){
                ele.list = document.getElementById("todo_list").value

                document.getElementById("submit").innerHTML = "Enter Task"
                document.getElementById("submit").style.background = "#380E60"
              

            }
            return ele
        })

        localStorage.setItem("data",JSON.stringify(updateData))
        data = JSON.parse(localStorage.getItem("data"))
        showData(data)

    }
  
    else{
         

    let num = Math.random()
    let obj = {
        "id": Math.round(num*1000),
        "list": todo_list,
        "status": false,
        "time": Date()
    }

    data.push(obj)

    localStorage.setItem("data",JSON.stringify(data))
    data = JSON.parse(localStorage.getItem("data"))
    showData(data)
    }


document.getElementById("id").value =""
    document.getElementById("todo_list").value =""                
})

// function lname(){
//     let subproduct = data.sort((a,b) => a.id - b.id)
//     showData(subproduct)
// }
function complete(){
    let subproduct = data.filter((ele) => ele.status == true)
    showData(subproduct)
}
function ncomplete(){
    let subproduct = data.filter((ele) => ele.status != true)
    showData(subproduct)
}
// function hname(){
//     let subproduct = data.sort((b,a) => b.id - a.id)
//     showData(subproduct)
// }

function dele(id){

    let deleData = data.filter((ele) => ele.id !=id)

   
    localStorage.setItem("data",JSON.stringify(deleData))
    data = JSON.parse(localStorage.getItem("data"))
    
    showData(data)
}

function check(id){
    let statusData = data.map((ele) => {
        if(ele.id === id){
            ele.status = !ele.status;
        }
         return ele;
    })
    

    localStorage.setItem("data",JSON.stringify(statusData))
     showData(JSON.parse(localStorage.getItem("data")));
    
    console.log(statusData)
    }
function update(id){
    let updatedData = data.filter((ele) =>{
        if( ele.id == id){
            
        document.getElementById("todo_list").value = ele.list
        document.getElementById("id").value = ele.id
        }
    } )

    document.getElementById("submit").innerHTML = "update"
    document.getElementById("submit").style.background = "#FFC107"

    // document.getElementById("todo_list").value =""
    // document.getElementById("id").value = ""
}


function moreCanvas(id){

     data = JSON.parse(localStorage.getItem("data"))

    let subdatas = data.filter((ele) => ele.id == id)
console.log(subdatas)
    document.querySelector(".offcanvas").innerHTML = ""

    subdatas.map((ele) => {
        document.querySelector(".offcanvas").innerHTML = `
              <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="staticBackdropLabel">More Information</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
    <h4>
     <ul>
        <li>Work : ${ele.list}</li>
        <li>Status : ${ele.status}</li>
  
     </ul></h4>
    </div>        
        `
    })

}


function showData(data){
    tbody.innerHTML=""

    data.map((ele) => {

        tbody.innerHTML += `
                       <tr class=" fs-4     ${ele.status ? 'table-success' : 'table-danger' }" id="box">
                            <td class="" >
   <input id="stat" onchange="check(${ele.id})" value="true" type="checkbox" ${ele.status ? "checked" : ""} class="status1" />
    
    
    
    </td>
                            <td>${ele.list}</td>
                            <td><button onclick="update(${ele.id})" class="btn btn-yellow fs-2" ><i class="ri-ball-pen-line"></i></button></td>
                            <td><button onclick="dele(${ele.id})" class="btn btn-red fs-2" ><i class="ri-close-large-line"></i></i></button></td>
                            <td>
                            <button class="btn fs-2 btn-blue" onclick="moreCanvas(${ele.id})" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="offcanvasWithBothOptions">⁝</button></td>
                        </tr>
        `
    })
}



data = JSON.parse(localStorage.getItem("data")) || []

data.map((ele) => {

    tbody.innerHTML += `

          <tr class="  fs-4     ${ele.status ? 'table-success ' : 'table-danger' }" id="box">
                     
<td class="" >

<input id="stat" onchange="check(${ele.id})" value="true" type="checkbox" ${ele.status ? "checked" : ""} class="status1 " />

</td>
                        <td>${ele.list}</td>
                        <td><button onclick="update(${ele.id})" class="btn btn-yellow fs-2" ><i class="ri-ball-pen-line"></i></button></td>
                        <td><button onclick="dele(${ele.id})" class="btn btn-red fs-2" ><i class="ri-close-large-line"></i></i></button></td>
     <td>
                            <button class="btn fs-2 btn-blue" onclick="moreCanvas(${ele.id})" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="offcanvasWithBothOptions">⁝</button></td>
                    </tr>
    `
})


setInterval( function(){
  
    

let time = new Date()
document.getElementById("time").innerHTML = `
 ${time.getHours()} :
${time.getMinutes()} :
${time.getSeconds()}
`
},1000
)







