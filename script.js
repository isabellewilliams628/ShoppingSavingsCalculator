/*
Get information from inputs (Make sure inputs are filled)
On button click we calculate
Output total
Calculate savings
Output savings
*/

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js'
    
        // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
    
        // Add Firebase products that you want to use
        import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js'
        import {getFirestore, collection, doc, setDoc, getDoc} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

        const firebaseConfig = {
        apiKey: "AIzaSyD8SVuOMiBPu6FoR3ArXTt7diSGWqMeA-I",
        authDomain: "shoppingsavingscalculator.firebaseapp.com",
        projectId: "shoppingsavingscalculator",
        storageBucket: "shoppingsavingscalculator.appspot.com",
        messagingSenderId: "573829662889",
        appId: "1:573829662889:web:8632662b437212ed6dc1b8",
        measurementId: "G-31MRC74F8K"
        };

        let userEmail = "";

// Initialize Firebase
        const app = initializeApp(firebaseConfig);
        let auth = getAuth();
        const db = getFirestore(app);


        const savingsRef = collection(db, "savings");

        /*
        const addData = () => {
        setDoc(doc(savingsRef, "test"),{
            savings: 26,
        });
    }

    addData();
    */

    /*
    const docRef = doc(db, "savings", "test");
    const result = await getDoc(docRef);
    console.log(result.data().savings);
    */

let totalSavings = 0;

//Gets input and calls other functions
const handleSubmit = () => {
    let subtotalInput = document.getElementById("subtotal").value;
    let discountInput = document.getElementById("discount").value;
    
    if((subtotalInput && discountInput) == ""){
        alert("Fill in the info");
        return null;
    }

    updateTotal(calculateDiscount(subtotalInput, discountInput));
    
}

const handleLogin = () =>{ 
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;

    if((emailInput && passwordInput) == ""){
        alert("Fill in the info");
        return null;
    }
    signInWithEmailAndPassword(auth, emailInput, passwordInput).then((response)=>{
        let username = response.user.email;
        userEmail = username;
        document.getElementById("login-container").innerHTML = `
            <div id="username">Hi, ${username}</div>
            <div id="sign-out-btn" onclick="signOutSwitch()" >Sign Out</div>
        
        ` 
        const docRef = doc(db, "savings", userEmail);
        let result;
        getDoc(docRef).then((response)=>{
            let parsedResult = response.data().savings;
        document.getElementById("savings-num").innerHTML = `$${parsedResult}`;
        })
    }).catch((error)=>{
        alert(error);
    })
}

const handleSignUp = () =>{
    let newUserEmail = document.getElementById("email").value;
    let newUserPassword = document.getElementById("password").value;

    if((newUserEmail && newUserPassword) == ""){
        alert("Fill in the info");
        return null;
    }

    createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword).then((response)=>{
        let username = response.user.email;
        userEmail = username;
        document.getElementById("login-container").innerHTML = `
            <div id="username">Welcome, ${username}</div>
            <div id="sign-out-btn" onclick="signOutSwitch()">Sign Out</div>
        
        `
        setDoc(doc(savingsRef, username),{
            savings: 0,
        })
    }).catch((error)=>{
        alert(error);
    })
}

const handleForgotPassword = () => {
    let resetEmail = document.getElementById("email").value;

    if(resetEmail == ""){
        alert("Fill in the info");
        return null;
    }

    sendPasswordResetEmail(auth, resetEmail).then((response)=>{
        console.log(response);
    }).catch((error)=>{
        alert(error);
    })

    document.getElementById("login-container").innerHTML = `
        <div id="sentEmail">Email Sent!</div>
        <div id="forgot-pass-btn" onclick="switchLogin()">Sign In/Sign Up</div>
    `
}



const signOutSwitch = () => {
    switchLogin();
    signOut(auth);
    console.log("here");
    auth = getAuth();
    console.log(auth);
}

//Calculates total saved amount from purchase
async function updateSavings(savings){
    if(userEmail != ""){
        const docRef = doc(db, "savings", userEmail);
        const result = await getDoc(docRef);
        let parsedResult = result.data().savings;

        parsedResult = parsedResult + savings;
        setDoc(doc(savingsRef, userEmail),{
            savings: parsedResult,
        })
        document.getElementById("savings-num").innerHTML = `$${parsedResult}`;
    }else{
        totalSavings = totalSavings + savings;
    document.getElementById("savings-num").innerHTML = `$${totalSavings}`;
    }
}

//Calculates discounted price
const calculateDiscount = (subtotal, discount) => {
    let total = (discount / 100) * subtotal;
    updateSavings(total);
    total = subtotal - total;
    return total;
}

//Updates total price
const updateTotal = (total) =>{
    document.getElementById("total-num").innerHTML = `$${total}`;
}

const forgotSwitch = () => {
    document.getElementById("login-container").innerHTML = `
            <input id="email" class="input-container" placeholder="Email"/>
            <div id="btn-container">
                <div id="reset-btn" onclick="handleForgotPassword()">Send Reset Email</div>
            </div>
            <div id="forgot-pass-btn" onclick="switchLogin()">Sign In/Sign Up</div>
    `
}

const switchLogin = () =>{
    document.getElementById("login-container").innerHTML = `
    <input id="email" class="input-container" placeholder="Email"/>
    <input id="password" class="input-container" placeholder="Password"/>
    <div id="btn-container">
        <div id="login-btn">Login</div>
        <div id="sign-up-btn">Sign Up</div>
    </div>
    <div id="forgot-pass-btn" onclick="forgotSwitch()">Forgot Password</div>
    `
}


window.handleSubmit = handleSubmit;
window.forgotSwitch = forgotSwitch;
window.switchLogin = switchLogin;
window.signOutSwitch = signOutSwitch;
window.handleLogin = handleLogin;
window.handleSignUp = handleSignUp;
window.handleForgotPassword = handleForgotPassword;