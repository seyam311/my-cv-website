// jsPDF library ka use karein
const { jsPDF } = window.jspdf;

// Form submit event handle karein
document.getElementById('cvForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Form fields se data collect karein
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const obtainedMarks = parseFloat(document.getElementById('obtainedMarks').value);
    const totalMarks = parseFloat(document.getElementById('totalMarks').value);
    const professionalSkills = document.getElementById('professionalSkills').value;
    const template = document.getElementById('template').value;

    // Automatic percentage calculation
    const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);

    // Form validation
    if (!name || !email || !phone || !education || !experience || !skills || isNaN(obtainedMarks) || isNaN(totalMarks) || !professionalSkills) {
        alert("Please fill all the fields!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number!");
        return;
    }

    // CV output display karein
    const cvOutput = document.getElementById('cvOutput');
    cvOutput.innerHTML = `
        <img src="" alt="User Picture" class="circle-image" id="cvPicture">
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
        <h3>Marks</h3>
        <p>Obtained Marks: ${obtainedMarks}</p>
        <p>Total Marks: ${totalMarks}</p>
        <p>Percentage: ${percentage}%</p>
        <h3>Professional Skills</h3>
        <p>${professionalSkills}</p>
        <button id="downloadBtn">Download CV as PDF</button>
    `;

    // Apply selected template
    cvOutput.className = template;

    // Display user picture
    const cvPicture = document.getElementById('cvPicture');
    if (userPicture) {
        cvPicture.src = userPicture;
    }

    // Download CV as PDF functionality
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const doc = new jsPDF();

        // Template ke hisab se styling apply karein
        if (template === 'template1') {
            doc.setFillColor(249, 249, 249); // Light gray background
            doc.rect(0, 0, 210, 297, 'F'); // A4 size (210mm x 297mm)
            doc.setTextColor(0, 0, 255); // Blue color for headings
        } else if (template === 'template2') {
            doc.setFillColor(233, 236, 239); // Light gray background
            doc.rect(0, 0, 210, 297, 'F'); // A4 size (210mm x 297mm)
            doc.setTextColor(220, 53, 69); // Red color for headings
        }

        // Add CV content to PDF
        doc.setFontSize(18);
        doc.text(`CV: ${name}`, 10, 10);

        doc.setFontSize(12);
        doc.text(`Email: ${email}`, 10, 20);
        doc.text(`Phone: ${phone}`, 10, 30);
        doc.text(`Education: ${education}`, 10, 40);
        doc.text(`Experience: ${experience}`, 10, 50);
        doc.text(`Skills: ${skills}`, 10, 60);
        doc.text(`Obtained Marks: ${obtainedMarks}`, 10, 70);
        doc.text(`Total Marks: ${totalMarks}`, 10, 80);
        doc.text(`Percentage: ${percentage}%`, 10, 90);
        doc.text(`Professional Skills: ${professionalSkills}`, 10, 100);

        // Add user picture to PDF
        if (userPicture) {
            doc.addImage(userPicture, 'JPEG', 10, 110, 50, 50); // Adjust position and size
        }

        // Save PDF
        doc.save('cv.pdf');
    });
});

// Email validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Phone validation function
function validatePhone(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone);
}

// Handle user picture upload
const pictureInput = document.getElementById('picture');
let userPicture = null;

pictureInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userPicture = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});