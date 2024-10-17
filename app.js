document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");
    const userTableBody = document.getElementById("userTableBody");
    loadUsers();

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const userKey = formData.get("email"); 
        const user = {
            name: formData.get("name"),
            age: formData.get("age"),
            address: formData.get("address"),
            email: formData.get("email")
        };
        
        addUser(userKey, user);
        form.reset();
    });

    function loadUsers() {
        const users = Object.keys(localStorage).map(key => {
            return JSON.parse(localStorage.getItem(key));
        });
        users.forEach(user => displayUser(user));
    }

    function addUser(userKey, user) {
        localStorage.setItem(userKey, JSON.stringify(user));
        displayUser(user);
    }

    function displayUser(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.address}</td>
            <td>${user.email}</td>
            <td class="actions">
                <button onclick="editUser('${user.email}')" class='yellow'>Edit</button>
                <button onclick="deleteUser('${user.email}')"class='red'>Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    }

    window.editUser = function(email) {
        const user = JSON.parse(localStorage.getItem(email));
        document.getElementById("name").value = user.name;
        document.getElementById("age").value = user.age;
        document.getElementById("address").value = user.address;
        document.getElementById("email").value = user.email;

        deleteUser(email); // Remove the user from storage before editing
    }

    window.deleteUser = function(email) {
        localStorage.removeItem(email);
        const row = Array.from(userTableBody.rows).find(r => r.cells[3].innerText === email);
        if (row) row.remove(); // Remove the row from the table
    }
});
