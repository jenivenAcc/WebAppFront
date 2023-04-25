const submit = document.querySelector('#submit');

let addproduct = document.getElementById("addproduct")
let shop = document.getElementById("shop");



fetch('http://localhost:8080/products/getproducts')
.then((data)=>{
    return data.json()
}).then((completedata)=>{
    console.log(completedata);
    let data1 = "";
    completedata.map((x)=>{
        data1+=`<div class="item">
                 <img class="prod-img" src= data:image/jpeg;base64,${x.prodImage} alt="">
                   <div class="details">
                    <h3 class = "prodtitle">${x.prodName}</h3>
                    <div class = "desc">${x.prodDesc}</div>
                    <div class="price-quantity">
                      <h4>Rs ${x.prodPrice}</h4>
                      <a class="prodcart" href="viewProduct.html"><i class="fa fa-shopping-cart " aria-hidden="true"></i></a>
                    </div>
                 </div>
                </div>`
    });
    document.getElementById("shop").innerHTML=data1;
    
})


//Register

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
 
}




addproduct.addEventListener('click',addProduct)

// login_submit.addEventListener('click',generateProducts);

