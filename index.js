const userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries.map((entry) => {
    return `<tr>
      <td class='border px-4 py-2'>${entry.name}</td>
      <td class='border px-4 py-2'>${entry.email}</td>
      <td class='border px-4 py-2'>${entry.password}</td>
      <td class='border px-4 py-2'>${entry.dob}</td>
      <td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>
    </tr>`;
  }).join("");

  const table = `<table class="table-auto w-full border">
    <thead>
      <tr>
        <th class="px-4 py-2 border">Name</th>
        <th class="px-4 py-2 border">Email</th>
        <th class="px-4 py-2 border">Password</th>
        <th class="px-4 py-2 border">DOB</th>
        <th class="px-4 py-2 border">Accepted Terms?</th>
      </tr>
    </thead>
    <tbody>
      ${tableEntries}
    </tbody>
  </table>`;

  document.getElementById("user-entries").innerHTML = table;
};

const isAgeValid = (dobInput) => {
  const dob = new Date(dobInput);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18 && age <= 55;
};

const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dobInput = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

  if (!isAgeValid(dobInput)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob: dobInput,
    acceptedTermsAndConditions
  };

  const userEntries = retrieveEntries();
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
