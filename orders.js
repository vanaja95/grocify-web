document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
});

function fetchOrders() {
    fetch('/orders')
        .then(response => response.json())
        .then(data => {
            const ordersContainer = document.getElementById('ordersContainer');
            if (data.length === 0) {
                ordersContainer.innerHTML = '<p>No orders found.</p>';
            } else {
                data.forEach(order => {
                    const orderElement = document.createElement('div');
                    orderElement.className = 'order';
                    orderElement.innerHTML = `
                        <h2>Order #${order.id}</h2>
                        <p>Date: ${order.date}</p>
                        <p>Total: $${order.total.toFixed(2)}</p>
                        <h3>Items:</h3>
                        <ul>
                            ${order.items.map(item => `<li>${item.name} (x${item.quantity}) - $${item.price.toFixed(2)}</li>`).join('')}
                        </ul>
                    `;
                    ordersContainer.appendChild(orderElement);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('ordersContainer').innerHTML = '<p>An error occurred. Please try again later.</p>';
        });
}

function logout() {
    alert('Logged out successfully!');
    window.location.href = 'login.html'; // Redirect to login page
}
