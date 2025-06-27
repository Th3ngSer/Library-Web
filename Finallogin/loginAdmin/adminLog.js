class Admin {
  constructor() {
    this.SHEETDB_API_URL = "https://sheetdb.io/api/v1/r1gmr69ui8hze";
    this.isLogin = true;
    this.init();
  }

  init() {
    this.form = document.getElementById("authForm");
    this.formTitle = document.getElementById("formTitle");
    this.confirmPasswordField = document.getElementById("confirmPasswordField");
    this.pinCodeField = document.getElementById("pinCodeField");
    this.toggleMessage = document.getElementById("toggleMessage");
    this.submitButton = document.getElementById("submitButton");
    this.form.addEventListener("submit", this.handleAuth.bind(this));
  }

  async fetchAllPinCodes() {
    try {
      const response = await fetch(this.SHEETDB_API_URL);
      const data = await response.json();
      if (data.length > 0) {
        const pinCodes = data.map((entry) => entry.pinCode).filter(Boolean);
        return pinCodes;
      } else {
        throw new Error("No PIN codes found in the sheet.");
      }
    } catch (error) {
      console.error("Error fetching PIN codes:", error);
      alert("An error occurred while fetching PIN codes. Please try again.");
      return [];
    }
  }

  async login(data) {
    try {
      const response = await fetch(
        `${this.SHEETDB_API_URL}/search?admin=${data.admin}&passwordAd=${data.passwordAd}`
      );
      const users = await response.json();
      if (users.length > 0) {
        alert("Login successful! Redirecting to another page...");
        window.location.href = "../../forAdmine/may/admin.html";
      } else {
        alert("Invalid admin username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  async signUp(data) {
    try {
      const checkResponse = await fetch(
        `${this.SHEETDB_API_URL}/search?admin=${data.admin}`
      );
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        alert(
          "Admin username already taken. Please choose a different username."
        );
        return;
      }

      const pinCodes = await this.fetchAllPinCodes();
      if (pinCodes.length === 0) {
        alert("No valid PIN codes found. Please contact the administrator.");
        return;
      }

      const pinCode = document.getElementById("pinCode").value;
      if (pinCode && !pinCodes.includes(pinCode)) {
        alert("Invalid Admin PIN Code. Please try again.");
        return;
      }

      data.role = pinCode && pinCodes.includes(pinCode) ? "admin" : "user";

      const response = await fetch(this.SHEETDB_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [data] }),
      });
      if (response.ok) {
        alert("Sign up successful! Please log in.");
        this.toggleForm();
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
      admin: formData.get("admin"),
      passwordAd: formData.get("passwordAd"),
    };

    if (this.isLogin) {
      await this.login(data);
    } else {
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (data.passwordAd !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
      await this.signUp(data);
    }
  }

  toggleForm() {
    if (this.isLogin) {
      this.formTitle.innerText = "Sign Up";
      this.confirmPasswordField.style.display = "block";
      this.pinCodeField.style.display = "block";
      this.toggleMessage.innerHTML =
        'Already have an account? <span onclick="admin.toggleForm()">Log In</span>';
      this.submitButton.innerText = "Sign Up";
    } else {
      this.formTitle.innerText = "Login";
      this.confirmPasswordField.style.display = "none";
      this.pinCodeField.style.display = "none";
      this.toggleMessage.innerHTML =
        'Don\'t have an account? <span onclick="admin.toggleForm()">Sign Up</span>';
      this.submitButton.innerText = "Log in";
    }
    this.isLogin = !this.isLogin;
  }
}

const admin = new Admin();
window.toggleForm = () => admin.toggleForm();
