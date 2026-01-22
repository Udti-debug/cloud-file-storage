// Firebase configuration (replace values with YOUR config)
const firebaseConfig = {
  apiKey: "AIzaSyASf2CzYR4hX4gy893PbOQaMyfbh6BtJzI",
  authDomain: "cloudfilestorage-9597f.firebaseapp.com",
  projectId: "cloudfilestorage-9597f",
  appId: "1:462495792003:web:8d85720bf4ac1064c494b6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Authentication
const auth = firebase.auth();

// Login button action
document.getElementById("loginBtn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      alert("Login successful: " + result.user.email);

      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("uploadDiv").style.display = "block";
    })
    .catch((error) => {
      alert("Login error: " + error.message);
    });
});
// Keep a list of uploaded files to simulate versioning
const uploadedFiles = {};

document.getElementById("uploadBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const fileVersionList = document.getElementById("fileVersionList");

    if (fileInput.files.length === 0) {
        alert("Please select a file first");
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name;

    // Track versions
    if (!uploadedFiles[fileName]) {
        uploadedFiles[fileName] = 1; // first version
    } else {
        uploadedFiles[fileName] += 1; // increment version
    }

    // Display uploaded file
    const p = document.createElement("p");
    p.textContent = `Uploaded: ${fileName} (version ${uploadedFiles[fileName]})`;
    fileList.appendChild(p);

    // Update version list (simulate history)
    const versionP = document.createElement("p");
    versionP.textContent = `${fileName} - Version ${uploadedFiles[fileName]} (shared with all users)`;
    fileVersionList.appendChild(versionP);

    alert(`File "${fileName}" uploaded successfully (version ${uploadedFiles[fileName]})`);
});
