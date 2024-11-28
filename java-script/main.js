var ProName = document.getElementById("ProName");
var ProPrice = document.getElementById("ProPrice");
var ProCat = document.getElementById("ProCat");
var ProDesc = document.getElementById("ProDesc");
var ProImg = document.getElementById("ProImg");
var Proser = document.getElementById("ProSer");
var catSer = document.getElementById("catSer");
var row = document.getElementById("row");
var nameAlert = document.getElementById("nameAlert");
var emptyName = document.getElementById("emptyName");
var priceAlert = document.getElementById("priceAlert");
var emptyPrice = document.getElementById("emptyPrice");
var catAlert = document.getElementById("catAlert");
var emptyCat = document.getElementById("emptyCat");
var descAlert = document.getElementById("descAlert");
var emptyDesc = document.getElementById("emptyDesc");

var ProductList;
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var globalIndex;
if(localStorage.getItem("productList")){
    ProductList = JSON.parse(localStorage.getItem("productList"));
    DisplayProduct(ProductList);
    
}
else{
    ProductList = [];
}

function addProduct(){
    if(emptyPriceValidation() & emptyNameValidaton()   & emptyCatValidation() & emptyDescValidation()){
        if(productNameValidation() && productPriceValidation() && productCatValidation() && productDescValidation()){
            var product = {
                name:ProName.value,
                price:ProPrice.value,
                cat:ProCat.value,
                desc:ProDesc.value,
                image:ProImg.files[0].name,
            }
            ProductList.push(product);
            DisplayProduct(ProductList);
            saveInLocalStorage();
            // ClearInputs();
        }

    }
   
   
}
function DisplayProduct(plist,nameTerm=0,catTerm=0){
    if(plist.length > 0){
        var cartoona = "";
        for(var i = 0; i < plist.length; i++ ){
            cartoona += `<div class="col-3">
              <img src="images/${plist[i].image}" class="w-100 img-fluid" alt="">
              <p>Product Name: ${nameTerm? plist[i].name.toLowerCase().replace(nameTerm,`<span class = "fw-bolder text-bg-warning">${nameTerm}</span>`): ProductList[i].name}</p>
              <p>Product Price: ${plist[i].price}</p>
              <p>Product Category: ${catTerm? plist[i].cat.toLowerCase().replace(catTerm,`<span class = "fw-bolder text-bg-warning">${catTerm}</span>`): ProductList[i].cat}</p>
              <p>Product Description: ${plist[i].desc}</p>
              <button onclick="setFormToUpdate(${i})" class=" btn  btn-outline-success w-100 my-1 ">Update</button>
              <button onclick="DeleteProduct(${i})"class="btn btn-outline-danger w-100">Delete</button>
            </div>`
    
        }
        row.innerHTML = cartoona;

    }else{
        row.innerHTML = `<div class="alert text-center py-5 alert-danger">No Match Found</div>`



    }

    
    
    
    
    
}


// Delete inputs function
function ClearInputs(){
    ProName.value = null;
    ProPrice.value = null;
    ProCat.value = null;
    ProDesc.value = null;



}

// Delete Product function
function DeleteProduct(index){
    ProductList.splice(index,1);
    DisplayProduct(ProductList);
    saveInLocalStorage()

}
// save in local storage
function saveInLocalStorage() {
    localStorage.setItem("productList",JSON.stringify(ProductList));
    
}
//  set form to update 
function setFormToUpdate(index){
    ProName.value = ProductList[index].name
    ProPrice.value = ProductList[index].price
    ProCat.value = ProductList[index].cat
    ProDesc.value = ProductList[index].desc

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    globalIndex = index;

}
// update product function
function updateProduct(){
    ProductList[globalIndex].name = ProName.value;
    ProductList[globalIndex].price = ProPrice.value;
    ProductList[globalIndex].cat = ProCat.value;
    ProductList[globalIndex].desc = ProDesc.value;
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    DisplayProduct(ProductList);
    localStorage();

}

// function to search for product by name
function searchProByName() {
    var sortedList = [];
    var term = Proser.value;
    for(var i = 0; i<ProductList.length; i++){
        if(ProductList[i].name.toLowerCase().includes(term.toLowerCase())){
            sortedList.push(ProductList[i])

        }
        
   
    }
    DisplayProduct(sortedList,term);
    
    

    
}

// function to search for product by category
function searchProByCat() {
    var sortedList = [];
    var catTerm = catSer.value;
    for(var i = 0; i<ProductList.length; i++){
        if(ProductList[i].cat.toLowerCase().includes(catTerm.toLowerCase())){
            sortedList.push(ProductList[i])
            DisplayProduct(sortedList,undefined,catTerm);
    }
    }
    

    
    }
    
    

    


// product name validaton function
function productNameValidation() {
    var regex = /^[A-Z][a-z]{3,8}$/
    if(ProName.value != ""){
        if(regex.test(ProName.value)){
            ProName.classList.add("is-valid")
            ProName.classList.remove("is-invalid")
            nameAlert.classList.replace("d-block","d-none")
            // emptyName.classList.replace("d-block","d-none")
            return true;
    
        }else{
            ProName.classList.add("is-invalid")
            ProName.classList.remove("is-valid")
            nameAlert.classList.replace("d-none","d-block")
        }

    }else{
        nameAlert.classList.replace("d-block","d-none")
        emptyName.classList.replace("d-block","d-none")
        ProName.classList.remove("is-invalid")



    }
    
    
}
// empty name alert function
function emptyNameValidaton() {
    if(ProName.value == ""){
        emptyName.classList.replace("d-none","d-block");
        nameAlert.classList.replace("d-block","d-none");
        return false;
    }
    else{
        emptyName.classList.replace("d-block","d-none")
        nameAlert.classList.replace("d-none","d-block")
        return true

    }

    
}

// product price validation function
function productPriceValidation() {
    if(ProPrice.value != ""){
        var regex = /^(10000|[1-4][0-9]{4}|50000)$/;
     if(regex.test(ProPrice.value)){
        ProPrice.classList.add("is-valid")
        ProPrice.classList.remove("is-invalid")
        priceAlert.classList.replace("d-block","d-none")
        return true
     }
     else{
        ProPrice.classList.add("is-invalid")
        ProPrice.classList.remove("is-valid")
        priceAlert.classList.replace("d-none","d-block")

     }

    }else{
        ProPrice.classList.remove("is-invalid")
        priceAlert.classList.replace("d-block","d-none")


    }
     
    
}
// empty price alert fucntion
function emptyPriceValidation(){
    if(ProPrice.value == ""){
        emptyPrice.classList.replace("d-none","d-block");
        priceAlert.classList.replace("d-block","d-none");
        return false;


    }else{
        emptyPrice.classList.replace("d-block","d-none");
        priceAlert.classList.replace("d-none","d-block");
        return true;



    }

}

// product categcory validation function
function productCatValidation(){
    if(ProCat.value != ""){
        var regex = /^(phone|electronics|tv|tablet)$/i
    if(regex.test(ProCat.value)){
        ProCat.classList.add("is-valid")
        ProCat.classList.remove("is-invalid")
        catAlert.classList.replace("d-block","d-none")
        return true
        

    }else{
        ProCat.classList.add("is-invalid")
        ProCat.classList.remove("is-valid")
        catAlert.classList.replace("d-none","d-block")

    }

    }else{
        catAlert.classList.replace("d-block","d-none")
        ProCat.classList.remove("is-invalid")

    }
    
    


}
// empty category alert function
function emptyCatValidation(){
    if(ProCat.value == ""){
        emptyCat.classList.replace("d-none","d-block");
        catAlertAlert.classList.replace("d-block","d-none");
        return false;


    }else{
        emptyCat.classList.replace("d-block","d-none");
        catAlert.classList.replace("d-none","d-block");
        return true;



    }

}

// product descripion validation function
function productDescValidation(){
    var regex = /^.{10,50}$/
    if(regex.test(ProDesc.value)){
        ProDesc.classList.add("is-valid")
        ProDesc.classList.remove("is-invalid")
        descAlert.classList.replace("d-block","d-none")
        return true
        

    }else{
        ProDesc.classList.add("is-invalid")
        ProDesc.classList.remove("is-valid")
        descAlert.classList.replace("d-none","d-block")

    }
    


}
// empty description alert function
function emptyDescValidation(){
    if(ProDesc.value == ""){
        emptyDesc.classList.replace("d-none","d-block");
        descAlert.classList.replace("d-block","d-none");
        return false;


    }else{
        emptyDesc.classList.replace("d-block","d-none");
        descAlert.classList.replace("d-none","d-block");
        return true;



    }

}
 function test(list,list2){
    var liss = []
    for(var i = 0; i<list.length; i++){
        if(list[i].cat == list2[i].cat){
            liss.push(list[i]);

        }
    }
    DisplayProduct(liss)
 }




