import React from "react";


const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          
          <span>Home</span>
        </li>
        <li style={styles.navItem}>
          
          <span>Browse Decks</span>
        </li>
        <li style={styles.navItem}>
          
          <span>Create Deck</span>
        </li>
        <li style={styles.navItem}>
          
          <span>Liked Decks</span>
        </li>
        <li style={styles.navItem}>
          
          <span>Progress</span>
        </li>
        <li style={styles.navItem}>
          
          <span>Profile / Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Navbar

const styles = {
  navbar: {
    width: "200px",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    height: "100vh",
    padding: "20px 10px",
    boxSizing: "border-box",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    cursor: "pointer",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
  },
};

