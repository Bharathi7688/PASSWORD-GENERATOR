const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  copyIcon = document.querySelector(".input-box span"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  generateBtn = document.querySelector(".generator-btn");

  const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
  };

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "" ,
    excludeDublicate= false,
    passLength=lengthSlider.value;

  options.forEach((Option)=>{
    if (Option.checked){
      if (Option.id!=="exc-dublicate" && Option.id!=="spaces"){
        staticPassword+= characters[Option.id];
      }else if (Option.id ==="spaces"){
        staticPassword+=`  ${staticPassword}  `; 
      }else{
        excludeDublicate=true;
      }
    }
  });
  
  for (let i=0; i< passLength; i++){
    let randomchar = 
    staticPassword[Math.floor(Math.random()*staticPassword.length)];
    if (excludeDublicate){
      !randomPassword.includes(randomchar) || randomchar == " "
      ? (randomPassword+=randomchar)
      : i--;
    } else{
      randomPassword+=randomchar;
    }
  }
  passwordInput.value=randomPassword;
};

const updatePassIndicator=()=>{
  passIndicator.id =
  lengthSlider.value<=8
  ? "weak"
  : lengthSlider.value <=16
  ? "medium"
  : "strong";
};

const updateSlider =() =>{
  document.querySelector(".pass-length span").innerText=lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

const copyPassword=()=>{
  navigator.clipboard.writeText(passwordInput.value);
  alert("Password Copied")
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

