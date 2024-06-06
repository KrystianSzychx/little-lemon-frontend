import './index.css';

const Menu = () => {
  const items = [
    { name: "Pizza Margherita", description: "Tomato, Mozzarella, Basil", price: "$10" },
    { name: "Caesar Salad", description: "Romaine, Croutons, Caesar Dressing", price: "$8" },
    { name: "Spaghetti Carbonara", description: "Pancetta, Egg, Parmesan", price: "$12" },
    { name: "Tiramisu", description: "Coffee, Mascarpone, Cocoa", price: "$6" },
    { name: "Lasagna", description: "Layers of Pasta, Beef, Tomato Sauce, Bechamel", price: "$14" },
    { name: "Bruschetta", description: "Grilled Bread, Tomatoes, Garlic, Basil", price: "$7" },
    { name: "Gelato", description: "Italian Ice Cream", price: "$5" },
  ];
  return (
    <div className="menu-container">
      <h1 className="menu-title">Menu</h1>
      <ul className="menu-list">
        {items.map((item, index) => (
          <li key={index} className="menu-item">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
