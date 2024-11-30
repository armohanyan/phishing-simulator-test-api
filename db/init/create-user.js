print("Creating user...");

db = db.getSiblingDB("admin");
print("Database switched to: " + db.getName());

try {
  db.createUser({
    user: "phishinguser",
    pwd: "phishingpassword", 
    roles: [
      { role: "readWrite", db: "phishing-simulator" }
    ]
  });
  print("User created successfully.");
} catch (e) {
  print("Error creating user: " + e);
}