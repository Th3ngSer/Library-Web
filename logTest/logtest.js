document.addEventListener("DOMContentLoaded", function () {
  const toggleLogin = document.getElementById("toggle-login");
  const toggleSignup = document.getElementById("toggle-signup");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.querySelector("form[name='contact-form']");

  // Initially hide the signup form
  signupForm.style.display = "none";

  // Toggle to Login Form
  toggleLogin.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      this.classList.add("active");
      toggleSignup.classList.remove("active");
      loginForm.style.display = "block";
      signupForm.style.display = "none";
    }
  });

  // Toggle to Signup Form
  toggleSignup.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
      this.classList.add("active");
      toggleLogin.classList.remove("active");
      loginForm.style.display = "none";
      signupForm.style.display = "block";
    }
  });
});

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Login & Signup</title>
//     <link rel="stylesheet" href="logtest.css" />
//   </head>
//   <body>
//     <div class="container">
//       <!-- Toggle Buttons -->
//       <div class="toggle-container">
//         <button id="toggle-login" class="active">Login</button>
//         <button id="toggle-signup">Signup</button>
//       </div>

//       <!-- Login Form -->
//       <form id="login-form" class="form">
//         <h2>Welcome Back!</h2>
//         <input type="text" name="username" placeholder="Username" required />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       <form
//         method="post"
//         action="https://script.google.com/macros/s/AKfycbzyim5Gom8A8s5EHGgCTv9OPZqJ_Hoo5sTO_Gk-EYcM4TaUH97CfeAcrpD3zhpui9Y/exec"
//         name="contact-form"
//       >
//         <h4>Contact Us</h4>
//         <input type="text" name="Username" placeholder="Name" />
//         <input type="text" name="Password" placeholder="Number" />

//         <input type="submit" value="Submit" id="submit" />
//       </form>
//     </div>

//     <script src="logtest.js"></script>
//   </body>
// </html>
