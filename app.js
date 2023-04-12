const submit = document.querySelector('#submit');
const login = document.querySelector('#login');
const addproduct = document.querySelector('#addproduct')

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
    var formData 
    let prodName= document.getElementById('prod-name').value;
    let prodDesc= document.getElementById('prod-desc').value;
    let prodPrice= document.getElementById('prod-price').value;
    let prodImg= document.getElementById('prod-image').files[0];
    const blobImg = new Blob([prodImg])

    var jsonObj = JSON.stringify({ 
                      prodname:prodName,
                      proddesc:prodDesc,
                      prodprice:prodPrice})

    axios({
        method :'post',
        url:'http://localhost:8080/products/uploadimage',
        data: jsonObj
    }
    )
}



submit.addEventListener('click',addUser);
login.addEventListener('click',loginUser);
addproduct.addEventListener('click',addProduct)