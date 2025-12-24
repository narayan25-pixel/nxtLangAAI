const bcrypt = require('bcryptjs');

// Usage: node scripts/hash-password.js yourpassword
const password = process.argv[2];

if (!password) {
  console.error('Please provide a password as an argument');
  console.log('Usage: node scripts/hash-password.js yourpassword');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log('\n========================================');
console.log('Password hashed successfully!');
console.log('========================================');
console.log('\nOriginal Password:', password);
console.log('Hashed Password:', hashedPassword);
console.log('\nUse this hashed password when creating a user in MongoDB:');
console.log('\nExample MongoDB document:');
console.log(JSON.stringify({
  name: "Admin User",
  email: "admin@example.com",
  password: hashedPassword,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}, null, 2));
console.log('\n========================================\n');
