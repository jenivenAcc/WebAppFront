const submit = document.querySelector('#submit');
const login = document.querySelector('#login');
let addproduct = document.getElementById("addproduct")
let shop = document.getElementById("shop");
let login_submit= document.getElementById("login-submit")

let shopProduct = [
    {
        productname : "perette",
        productdesc : "Chocolate Milk, 250ml, Pack of 6",
        productprice : "56",
        productimg:"perette.png"
    }
]



let generateProducts =()=>{
    return (shop.innerHTML= shopProduct.map((x) => {
        return `<div class="item">
        <img class="prod-img" src=${x.productimg} alt="">
        <div class="details">
            <h3 class = "prodtitle">${x.productname}</h3>
            <div class = "desc">${x.productdesc}</div>
            <div class="price-quantity">
                <h4>Rs ${x.productprice}</h4>
                <a class="prodcart" href="productview.php"><i class="fa fa-shopping-cart " aria-hidden="true"></i></a>
            </div>
        </div>
    </div>`
    }))
}

//Register
const addUser = async()=>{
    let userName= document.getElementById("username").value
    let email= document.getElementById("email").value
    let password= document.getElementById("password").value

    let response = await fetch('http://localhost:8080/api/user/registration',{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        username:userName,
        email:email,
        password:password
    })
   
});
 let errorMsg = document.querySelector("#errorMsgReg")

    if (response.status===200){
        errorMsg.innerText = "Successfully Registered"
        window.location.href ='shop.html';
    } else if(response.status ===500){
        errorMsg.innerText = "Credentials Already Exist. Try Again with different details!"
    }

    console.log(response);
}
// Login
const loginUser = async()=>{
    
    let userName_email = document.getElementById("username-email").value
    let password_login= document.getElementById("password-login").value

    let response = await fetch('http://localhost:8080/api/user/login',{
    method: 'POST',
    headers :{
        'Accept': 'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        username:userName_email,
        email:userName_email,
        password:password_login
    })
    })
    let errorMsg = document.querySelector("#errorMsg")
    if (response.status===200){
        errorMsg.innerText = ""
        window.location.href ='shop.html';
    } else if(response.status ===500){
        errorMsg.innerText = "Wrong Credentials. Try Again!"
    }

}
const addProduct = async()=>{
    let prodName= document.getElementById('prod-name').value;
    let prodDesc= document.getElementById('prod-desc').value;
    let prodPrice= document.getElementById('prod-price').value;
    let prodImg= document.getElementById('prod-image').files[0];


    let formData = new FormData();
    formData.append('name',prodName)
    formData.append('desc',prodDesc)
    formData.append('price',prodPrice)
    formData.append('image',prodImg)
    
    const req = new XMLHttpRequest();
    req.open("POST","http://localhost:8080/products/uploadimage")
    req.send(formData)
    
    const blobImg = new Blob([prodImg])
}



submit.addEventListener('click',addUser);
// login.addEventListener('click',loginUser);
login_submit.addEventListener('click',generateProducts);
addproduct.addEventListener('click',addProduct)
