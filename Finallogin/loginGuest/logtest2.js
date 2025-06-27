// let isLogin = true; // Flag to toggle between Login and Sign-Up forms
// // Login Function
// async function login(data) {
//   try {
//     const response = await fetch(
//       `https://sheetdb.io/api/v1/r1gmr69ui8hze/search?username=${data.username}&password=${data.password}`
//     );
//     const users = await response.json();
//     if (users.length > 0) {
//       alert("Login successful! Redirecting to another page...");
//       window.location.href = "../../HomeContainer/mainFile/Homepage.html"; // Redirect to another page
//     } else {
//       alert("Invalid username or password. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("An error occurred. Please try again.");
//   }
// }

// // Sign-Up Function
// async function signUp(data) {
//   try {
//     // Check if username already exists
//     const checkResponse = await fetch(
//       `https://sheetdb.io/api/v1/r1gmr69ui8hze/search?username=${data.username}`
//     );
//     const existingUsers = await checkResponse.json();
//     if (existingUsers.length > 0) {
//       alert("Username already taken. Please choose a different username.");
//       return;
//     }

//     // Proceed with sign-up if username does not exist
//     const response = await fetch("https://sheetdb.io/api/v1/r1gmr69ui8hze", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: [data] }),
//     });
//     if (response.ok) {
//       alert("Sign up successful! Please log in.");
//       toggleForm(); // Switch to login form after successful sign up
//     } else {
//       alert("Sign up failed. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("An error occurred. Please try again.");
//   }
// }

// async function handleAuth(event) {
//   event.preventDefault();
//   const form = document.getElementById("authForm");
//   const formData = new FormData(form);
//   const data = {
//     username: formData.get("username"),
//     password: formData.get("password"),
//   };

//   if (isLogin) {
//     // Login Logic
//     await login(data);
//   } else {
//     // Sign-Up Logic
//     const confirmPassword = document.getElementById("confirmPassword").value;
//     if (data.password !== confirmPassword) {
//       alert("Passwords do not match. Please try again.");
//       return;
//     }
//     await signUp(data); // Wait for sign-up to complete before proceeding
//   }
// }

// // Toggle between Login and Sign-Up forms
// function toggleForm() {
//   // hide and show
//   const formTitle = document.getElementById("formTitle");
//   const confirmPasswordField = document.getElementById("confirmPasswordField");
//   const toggleMessage = document.getElementById("toggleMessage");
//   const submitButton = document.getElementById("submitButton");

//   if (isLogin) {
//     formTitle.innerText = "Sign Up";
//     confirmPasswordField.style.display = "block";
//     toggleMessage.innerHTML =
//       'Already have an account? <span onclick="toggleForm()">Log In</span>';
//     submitButton.innerText = "Sign Up";
//   } else {
//     formTitle.innerText = "Login";
//     confirmPasswordField.style.display = "none";
//     toggleMessage.innerHTML =
//       'Don\'t have an account? <span onclick="toggleForm()">Sign Up</span>';
//     submitButton.innerText = "Log in";
//   }
//   isLogin = !isLogin;
// }
class AuthForm {
  constructor() {
    this.isLogin = true; // Flag to toggle between Login and Sign-Up forms
    this.init();
  }

  init() {
    this.form = document.getElementById("authForm");
    this.formTitle = document.getElementById("formTitle");
    this.confirmPasswordField = document.getElementById("confirmPasswordField");
    this.toggleMessage = document.getElementById("toggleMessage");
    this.submitButton = document.getElementById("submitButton");
    this.form.addEventListener("submit", this.handleAuth.bind(this));
  }

  async login(data) {
    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/r1gmr69ui8hze/search?username=${data.username}&password=${data.password}`
      );
      const users = await response.json();
      if (users.length > 0) {
        alert("Login successful! Redirecting to another page...");
        window.location.href = "../../HomeContainer/mainFile/Homepage.html"; // Redirect to another page
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  async signUp(data) {
    try {
      // Check if username already exists
      const checkResponse = await fetch(
        `https://sheetdb.io/api/v1/r1gmr69ui8hze/search?username=${data.username}`
      );
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        alert("Username already taken. Please choose a different username.");
        return;
      }

      // Proceed with sign-up if username does not exist
      const response = await fetch("https://sheetdb.io/api/v1/r1gmr69ui8hze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [data] }),
      });
      if (response.ok) {
        alert("Sign up successful! Please log in.");
        this.toggleForm(); // Switch to login form after successful sign up
      } else {
        alert("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  async handleAuth(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    if (this.isLogin) {
      // Login Logic
      await this.login(data);
    } else {
      // Sign-Up Logic
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (data.password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
      await this.signUp(data); // Wait for sign-up to complete before proceeding
    }
  }

  toggleForm() {
    if (this.isLogin) {
      this.formTitle.innerText = "Sign Up";
      this.confirmPasswordField.style.display = "block";
      this.toggleMessage.innerHTML =
        'Already have an account? <span onclick="authForm.toggleForm()">Log In</span>';
      this.submitButton.innerText = "Sign Up";
    } else {
      this.formTitle.innerText = "Login";
      this.confirmPasswordField.style.display = "none";
      this.toggleMessage.innerHTML =
        'Don\'t have an account? <span onclick="authForm.toggleForm()">Sign Up</span>';
      this.submitButton.innerText = "Log in";
    }
    this.isLogin = !this.isLogin;
  }
}

// Instantiate the AuthForm class
const authForm = new AuthForm();

// Expose the toggleForm method to the global scope for the onclick event
window.toggleForm = () => authForm.toggleForm();
