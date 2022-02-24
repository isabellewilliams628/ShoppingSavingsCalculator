/*
Get information from inputs (Make sure inputs are filled)
On button click we calculate
Output total
Calculate savings
Output savings
*/

let totalSavings = 0;

//Gets input and calls other functions
handleSubmit = () => {
    let subtotalInput = document.getElementById("subtotal").value;
    let discountInput = document.getElementById("discount").value;
    
    if((subtotalInput && discountInput) == ""){
        alert("Fill in the info");
        return null;
    }

    updateTotal(calculateDiscount(subtotalInput, discountInput));
    
}

//Calculates total saved amount from purchase
updateSavings = (savings) => {
    totalSavings = totalSavings + savings;
    document.getElementById("savings-num").innerHTML = `$${totalSavings}`;
}

//Calculates discounted price
calculateDiscount = (subtotal, discount) => {
    let total = (discount / 100) * subtotal;
    updateSavings(total);
    total = subtotal - total;
    return total;
}

//Updates total price
updateTotal = (total) =>{
    document.getElementById("total-num").innerHTML = `$${total}`;
}