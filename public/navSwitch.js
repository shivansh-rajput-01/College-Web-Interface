
// Check if user is logged in
const user = JSON.parse(localStorage.getItem('loggedInUser'));

if (user) {
    const btnContainer = document.querySelector('.navbar-collapse .mx-2');

    if (btnContainer) {
        // URL banaya jisme user ka data hai
        const dashboardUrl = `/dashboard?username=${user.username}&role=${user.role}&name=${user.name}`;

        btnContainer.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        👤 ${user.name}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="${dashboardUrl}">Dashboard</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
                    </ul>
                </div>
            `;

        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.reload();
        });
    }
}
