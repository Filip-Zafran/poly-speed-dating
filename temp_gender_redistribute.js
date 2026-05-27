const fs = require('fs');

// Read dashboard.html to extract applicants
let dashContent = fs.readFileSync('dashboard.html', 'utf8');
let dashMatch = dashContent.match(/const applicants = \[([\s\S]*?)\];/);
if (!dashMatch) {
  console.error('Could not find applicants in dashboard.html');
  process.exit(1);
}

// Parse the applicants array - convert to valid JSON and back
let appStr = '[' + dashMatch[1] + ']';
// Remove trailing comma if exists
appStr = appStr.replace(/,\s*\]/, ']');
let applicants = eval('(' + appStr + ')');

console.log(`Found ${applicants.length} applicants`);

// Count current gender distribution
const genderCounts = {};
applicants.forEach(app => {
  genderCounts[app.gender] = (genderCounts[app.gender] || 0) + 1;
});
console.log('Current gender distribution:', genderCounts);

// Redistribute genders: 35 women, 55 men, 6 non-binary, 4 agender
const newGenders = [];
for (let i = 0; i < 35; i++) newGenders.push('Woman');
for (let i = 0; i < 55; i++) newGenders.push('Man');
for (let i = 0; i < 6; i++) newGenders.push('Non-binary');
for (let i = 0; i < 4; i++) newGenders.push('Agender');

console.log(`Target distribution: ${newGenders.length} applicants`);

// Shuffle gender array for random distribution
for (let i = newGenders.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [newGenders[i], newGenders[j]] = [newGenders[j], newGenders[i]];
}

// Update applicants with new genders
applicants.forEach((app, i) => {
  app.gender = newGenders[i];
});

// Verify new distribution
const newCounts = {};
applicants.forEach(app => {
  newCounts[app.gender] = (newCounts[app.gender] || 0) + 1;
});
console.log('New gender distribution:', newCounts);

// Convert back to string format
let appStr2 = JSON.stringify(applicants, null, 6);
// Add proper formatting like the original
appStr2 = appStr2.replace(/"/g, "'").replace(/\n      /g, '\n      ');

// Write to temp file for use in sed/edit
fs.writeFileSync('temp_applicants.json', JSON.stringify(applicants, null, 2));
console.log('Applicants saved to temp_applicants.json');
