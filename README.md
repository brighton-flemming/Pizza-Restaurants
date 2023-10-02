# Pizza-Restaurants

This is a web application built using Flask for the backend and React.js for the frontend. The app allows users to view a list of pizza restaurants, their available pizzas, and manage the restaurant and pizza data.

Prerequisites
Python 3.x
Flask
React.js
Node.js
npm
Installation
Backend (Flask)
Clone the repository:

bash
Copy code
git clone https://github.brighton-flemming/Pizza-Restaurants-app.git
Navigate to the backend folder:

bash
Copy code
cd pizza-restaurant-app/backend
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run the Flask development server:

bash
Copy code
flask run
The backend server will run on http://127.0.0.1:5000.

Frontend (React.js)
Navigate to the frontend folder:

bash
Copy code
cd pizza-restaurant-app/frontend
Install dependencies:

bash
Copy code
npm install
Run the React development server:

bash
Copy code
npm start
The frontend server will run on http://localhost:3000.

Features
View Restaurants: Users can view a list of pizza restaurants with their addresses and whether they are open or closed.
View Pizzas: Users can see the available pizzas for each restaurant, including their names and ingredients.
Add Restaurant: Admin users can add a new pizza restaurant with a name, address, and open/close status.
Add Pizza: Admin users can add a new pizza to a restaurant with a name and list of ingredients.
Update Restaurant: Admin users can update the details of an existing restaurant, including its name, address, and open/close status.
Update Pizza: Admin users can update the details of an existing pizza, including its name and ingredients.
Delete Restaurant: Admin users can delete an existing restaurant and all of its associated pizzas.
Delete Pizza: Admin users can delete an existing pizza.
API Endpoints
GET /restaurants: Get a list of all restaurants.
POST /restaurants: Add a new restaurant.
GET /restaurants/<int:restaurant_id>/pizzas: Get a list of pizzas for a specific restaurant.
POST /restaurants/<int:restaurant_id>/pizzas: Add a new pizza to a specific restaurant.
PUT /restaurants/<int:restaurant_id>: Update details of a specific restaurant.
PUT /pizzas/<int:pizza_id>: Update details of a specific pizza.
DELETE /restaurants/<int:restaurant_id>: Delete a specific restaurant.
DELETE /pizzas/<int:pizza_id>: Delete a specific pizza.
Contributing
Contributions are welcome! Please follow these steps:

Fork the project.
Create your feature branch: git checkout -b feature/new-feature.
Commit your changes: git commit -m 'Add new feature'.
Push to the branch: git push origin feature/new-feature.
Submit a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

