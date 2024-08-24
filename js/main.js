
const productNameInput= document.getElementById("productName");
const productPriceInput= document.getElementById("productPrice");
const productCategoryInput= document.getElementById("productCategory");
const productDescInput= document.getElementById("productDesc");
const addBtn=document.getElementById("addBtn");
const searchInput=document.getElementById('searchInput');
const inputs=document.getElementsByClassName("form-control");
const nameAlert=document.getElementById("nameAlert");
const Alert=document.getElementById("Alert");
const priceAlert=document.getElementById("priceAlert");



var currentIndex=0;
var products=[];
if(JSON.parse(localStorage.getItem('productsList'))!=null)
{
    products=JSON.parse(localStorage.getItem('productsList'));
    displayData();
}


//local storage 
//localStorage.setItem('shahd','farida')
addBtn.onclick=function(){
    if(addBtn.innerHTML=='add Product')
    {
        addProduct();

    }
    else{
        updateProduct();
    }
    
   displayData();
   clearForm();
    
}
searchInput.onkeyup=function(){
    var addTable='';
    for( var i=0 ; i<products.length ; i++)
        {
            if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
            {
                addTable+=`<tr>
                                <td>${products[i].name } </td>
                                <td>${products[i].price}  </td>
                                <td>${products[i].category}  </td>
                                <td>${products[i].desc}  </td>
                                <td><button  class=" btn btn-danger">update</button></td>
                                <td><button onclick="deleteProduct(${i})" class=" btn btn-warning">delete</button></td>              
                        </tr>`
            }
        }
    document.getElementById("tableBody").innerHTML=addTable;


}
function addProduct()
{
    var product=
    {
        name: productNameInput.value,
        price:productPriceInput.value ,
        category: productCategoryInput.value,
        desc: productDescInput.value

    }
    products.push(product);
    localStorage.setItem('productsList',JSON.stringify(products));
}
function displayData()
{
    var addTable='';
    for( var i=0 ; i<products.length ; i++)
    {
        addTable+=`<tr>
                        <td>${products[i].name } </td>
                        <td>${products[i].price}  </td>
                        <td>${products[i].category}  </td>
                        <td>${products[i].desc}  </td>
                        <td><button onclick="getProductInfo(${i})" class=" btn btn-danger">update</button></td>
                        <td><button onclick="deleteProduct(${i})" class=" btn btn-warning">delete</button></td>              
                  </tr>`
    }
    document.getElementById("tableBody").innerHTML=addTable;

}
function deleteProduct(index)
{
    products.splice(index,1);
    displayData();
    localStorage.setItem('productsList',JSON.stringify(products));

}

function getProductInfo(index) {
    currentIndex=index;
    var currentProduct = products[index];
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescInput.value = currentProduct.desc;
    addBtn.innerHTML = 'update product';

}
function updateProduct(){
    var product=
    {
        name: productNameInput.value,
        price:productPriceInput.value ,
        category: productCategoryInput.value,
        desc: productDescInput.value,

    }
    products[currentIndex]=product;
    localStorage.setItem('productsList',JSON.stringify(products));
    addBtn.innerHTML='add Product';

}

function clearForm(){
    for(var i=0 ; i<inputs.length ; i++){
        inputs[i].value='';
    }
}
function testInputs() {
    const inputs = document.getElementsByTagName('input');
    let inputsValid = true;
  
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        inputsValid = false;
        break;
      }
    }
  
    if (inputsValid) 
    {
      addBtn.removeAttribute('disabled');
    } else
    {
      addBtn.disabled = true;
    }
  }

productNameInput.onkeyup=function()
{
    var nameRegax=/^[a-zA-Z]{3,}$/;
    if(nameRegax.test(productNameInput.value)) //valid
    {
        addBtn.removeAttribute('disabled');
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameAlert.classList.add('d-none');
    }
    else // invalid
    {
        addBtn.disabled='true';
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        nameAlert.classList.remove('d-none');
    }
    testInputs();
}
productCategoryInput.onkeyup=function()
{
    var nameRegax=/^[a-zA-Z]{3,}$/;
    if(nameRegax.test(productCategoryInput.value)) //valid
    {
        addBtn.removeAttribute('disabled');
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        Alert.classList.add('d-none');
    }
    else // invalid
    {
        addBtn.disabled='true';
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        Alert.classList.remove('d-none');
    }
    testInputs();
}

productPriceInput.onkeyup=function()
{
    var nameRegex=/^[-+]?[0-9]+(\.[0-9]+)*$/;
  
    
    if(nameRegex.test(productPriceInput.value)) //valid
    {
        addBtn.removeAttribute('disabled');
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        priceAlert.classList.add('d-none');


    }
    else
    {
        addBtn.disabled='true';
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        priceAlert.classList.remove('d-none');
        
    }
    testInputs();
}




  
